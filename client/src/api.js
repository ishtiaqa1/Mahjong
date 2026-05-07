import { supabase } from './supabase.js';
import bcrypt from 'bcryptjs';

// ============================================================
// AUTH
// ============================================================

// Used by: Signup.jsx
export async function signup(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { error } = await supabase
    .from('users')
    .insert({ name, email, password: hashedPassword });

  if (error) {
    if (error.code === '23505') {
      if (error.message.includes('email')) return { success: false, message: 'Email already in use.' };
      return { success: false, message: 'Username already taken.' };
    }
    return { success: false, message: error.message };
  }
  return { success: true, message: 'User registered successfully!' };
}

// Used by: LoginPage.jsx
export async function login(identifier, password) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`email.eq.${identifier},name.eq.${identifier}`)
    .single();

  if (error || !data) return { success: false, message: 'User not found.' };

  const match = await bcrypt.compare(password, data.password);
  if (!match) return { success: false, message: 'Invalid password.' };

  await supabase
    .from('users')
    .update({ last_access_time: Math.floor(Date.now() / 1000) })
    .eq('id', data.id);

  return {
    success: true,
    message: 'Login successful!',
    user: { id: data.id, name: data.name, email: data.email },
  };
}

// ============================================================
// HEARTBEAT / ONLINE STATUS
// ============================================================

// Used by: Heartbeat.jsx  (replaces update-online.php)
// Call with online=true to mark active, online=false to mark offline
export async function heartbeat(username, online = true) {
  const timestamp = online ? Math.floor(Date.now() / 1000) : 1;

  const { error } = await supabase
    .from('users')
    .update({ last_access_time: timestamp })
    .eq('name', username);

  if (error) console.error('Heartbeat error:', error.message);
}

// ============================================================
// LEADERBOARD
// ============================================================

// Used by: LeaderboardPage.jsx  (replaces leaderboard.php)
// Returns object keyed 1-10 matching the shape your component expects:
// { 1: { name, id, wins }, 2: ..., ... }
export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('user_games')
    .select('user_id, games_won, users(id, name)')
    .order('games_won', { ascending: false })
    .limit(10);

  if (error) return { success: false, message: error.message };

  const empty = { name: '', id: -1, wins: 0 };
  const leaderboard = {};
  for (let i = 1; i <= 10; i++) leaderboard[i] = { ...empty };

  data.forEach((row, i) => {
    leaderboard[i + 1] = {
      id: row.user_id,
      name: row.users?.name ?? '',
      wins: row.games_won,
    };
  });

  return { success: true, leaderboard };
}

// ============================================================
// STATISTICS
// ============================================================

// Used by: LeaderboardPage.jsx, AllFriendsPage.jsx  (replaces get-statistics.php)
// Respects Hide_stats — returns { success: false } if hidden
export async function getPublicStats(userId) {
  const { data: user } = await supabase
    .from('users')
    .select('Hide_stats')
    .eq('id', userId)
    .single();

  if (!user) return { success: false, message: 'User not found.' };
  if (user.Hide_stats === 1) return { success: false, message: 'User statistics are hidden.' };

  return _getStatsForUser(userId);
}

// Used by: ProfilePage.jsx  (replaces get-user-statistics.php)
// Always returns stats regardless of Hide_stats (it's the owner viewing their own)
export async function getMyStats(userId) {
  return _getStatsForUser(userId);
}

async function _getStatsForUser(userId) {
  const { data } = await supabase
    .from('user_games')
    .select('games_played, games_won')
    .eq('user_id', userId)
    .single();

  const games = data?.games_played ?? 0;
  const wins = data?.games_won ?? 0;
  let rank = 0;

  if (wins > 0) {
    const { data: ranked } = await supabase
      .from('user_games')
      .select('user_id')
      .order('games_won', { ascending: false });

    if (ranked) {
      const pos = ranked.findIndex(r => r.user_id == userId);
      if (pos !== -1) rank = pos + 1;
    }
  }

  return { success: true, data: { games, wins, rank } };
}

// Used by: ProfilePage.jsx  (replaces hide-stats.php)
export async function toggleHideStats(userId) {
  const { data: user } = await supabase
    .from('users')
    .select('Hide_stats')
    .eq('id', userId)
    .single();

  if (!user) return { success: false, message: 'User not found.' };

  const newValue = user.Hide_stats === 1 ? 0 : 1;

  const { error } = await supabase
    .from('users')
    .update({ Hide_stats: newValue })
    .eq('id', userId);

  if (error) return { success: false, message: error.message };
  return { success: true, new_value: newValue };
}

// ============================================================
// GAME TRACKING
// ============================================================

// Used by wherever you call gamesWon.php
export async function recordGameWon(userId) {
  const { data } = await supabase
    .from('user_games')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (data) {
    await supabase.rpc('increment_games_won', { uid: userId });
  } else {
    await supabase
      .from('user_games')
      .insert({ user_id: userId, games_played: 0, games_won: 1 });
  }
  return { success: true, message: 'Games won updated.' };
}

// Used by wherever you call updateGames.php
export async function recordGamePlayed(userId) {
  const { data } = await supabase
    .from('user_games')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (data) {
    await supabase.rpc('increment_games_played', { uid: userId });
  } else {
    await supabase
      .from('user_games')
      .insert({ user_id: userId, games_played: 1, games_won: 0 });
  }
  return { success: true, message: 'Games played updated.' };
}

// ============================================================
// FRIENDS
// ============================================================

// Used by: ProfilePage.jsx, AllFriendsPage.jsx  (replaces getfriends.php)
export async function getFriends(userId) {
  const now = Math.floor(Date.now() / 1000);

  const { data, error } = await supabase
    .from('friends')
    .select('user2, users!friends_user2_fkey(id, name, last_access_time)')
    .eq('user1', userId);

  if (error) return [];

  return data.map(row => ({
    id: row.users.id,
    name: row.users.name,
    online: now - (row.users.last_access_time ?? 0) < 180,
  }));
}

// Used by: addfriends.jsx  (replaces getusers.php)
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('id, name');

  if (error) return [];
  return data;
}

// Used by: addfriends.jsx  (replaces request-friend.php)
export async function sendFriendRequest(userId, requestedId) {
  if (String(userId) === String(requestedId)) {
    return { success: false, message: 'You cannot send a friend request to yourself.' };
  }

  const { error } = await supabase
    .from('requests')
    .insert({ user: userId, request: requestedId });

  if (error) {
    if (error.code === '23505') return { success: false, message: 'Friend request already sent.' };
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Friend request sent successfully.' };
}

// Used by: PendingRequestsPage.jsx  (replaces get-pending-requests.php)
export async function getPendingRequests(userId) {
  const { data, error } = await supabase
    .from('requests')
    .select('user, users!requests_user_fkey(id, name)')
    .eq('request', userId);

  if (error) return [];

  return data.map(row => ({
    id: row.users.id,
    name: row.users.name,
  }));
}

// Used by: PendingRequestsPage.jsx  (replaces accept-friend.php)
export async function acceptFriendRequest(userId, requesterId) {
  const { error: friendError } = await supabase
    .from('friends')
    .insert([
      { user1: userId, user2: requesterId },
      { user1: requesterId, user2: userId },
    ]);

  if (friendError) return { success: false, message: friendError.message };

  await supabase
    .from('requests')
    .delete()
    .match({ user: requesterId, request: userId });

  return { success: true, message: 'Friend request accepted.' };
}

// Used by: PendingRequestsPage.jsx  (replaces delete-request.php)
export async function deleteFriendRequest(userId, requesterId) {
  const { error } = await supabase
    .from('requests')
    .delete()
    .match({ user: requesterId, request: userId });

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'Friend request declined.' };
}

// Used by: AllFriendsPage.jsx  (replaces removefriend.php)
export async function removeFriend(user1, user2) {
  const { error } = await supabase
    .from('friends')
    .delete()
    .or(
      `and(user1.eq.${user1},user2.eq.${user2}),and(user1.eq.${user2},user2.eq.${user1})`
    );

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'Friend removed successfully.' };
}

// ============================================================
// PROFILE PICTURE
// ============================================================

// Used by: UploadPFP.jsx  (replaces upload-pfp.php + get-pfp.php)
// Returns { success, url } where url is the public Supabase Storage URL
export async function uploadProfilePicture(userId, file) {
  const ext = file.name.split('.').pop();
  const path = `${userId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('profile-pictures')
    .upload(path, file, { upsert: true });

  if (uploadError) return { success: false, message: uploadError.message };

  const { data } = supabase.storage
    .from('profile-pictures')
    .getPublicUrl(path);

  await supabase
    .from('users')
    .update({ pfp_path: data.publicUrl })
    .eq('id', userId);

  return { success: true, filepath: data.publicUrl };
}

// Used by: UploadPFP.jsx on load  (replaces get-pfp.php)
export async function getProfilePicture(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('pfp_path')
    .eq('id', userId)
    .single();

  if (error || !data?.pfp_path) {
    return { success: true, filepath: '' };
  }
  return { success: true, filepath: data.pfp_path };
}

// ============================================================
// USER SETTINGS
// ============================================================

// Used by: UserSettings.jsx  (replaces fetch-email.php)
export async function fetchEmail(username) {
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('name', username)
    .single();

  if (error) return { success: false, message: error.message };
  return { success: true, data: { email: data.email } };
}

// Used by: CheckPassPopup.jsx, PasswordPopup.jsx  (replaces validate-password.php)
export async function validatePassword(username, password) {
  const { data, error } = await supabase
    .from('users')
    .select('password')
    .eq('name', username)
    .single();

  if (error || !data) return { success: false, message: 'User not found.' };

  const match = await bcrypt.compare(password, data.password);
  return match
    ? { success: true, message: 'Passwords match.' }
    : { success: false, message: 'Invalid password.' };
}

// Used by: UsernamePopup.jsx  (replaces change-username.php)
export async function changeUsername(oldUsername, newUsername) {
  const { error } = await supabase
    .from('users')
    .update({ name: newUsername })
    .eq('name', oldUsername);

  if (error) {
    if (error.code === '23505') return { success: false, message: 'Username already taken.' };
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Username changed.', newuser: newUsername };
}

// Used by: EmailPopup.jsx  (replaces change-email.php)
export async function changeEmail(username, newEmail) {
  const { error } = await supabase
    .from('users')
    .update({ email: newEmail })
    .eq('name', username);

  if (error) {
    if (error.code === '23505') return { success: false, message: 'Email already in use.' };
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Email changed.' };
}

// Used by: PasswordPopup.jsx  (replaces change-password.php)
export async function changePassword(username, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const { error } = await supabase
    .from('users')
    .update({ password: hashedPassword })
    .eq('name', username);

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'Password changed.' };
}

// ============================================================
// LOBBY  (replaces update-lobby.php)
// ============================================================
// The lobby is handled with Supabase Realtime Presence, not this api.js file.
// See lobby.jsx — replace the fetch() calls there with the Realtime Presence
// pattern shown in the migration guide.
// ============================================================
