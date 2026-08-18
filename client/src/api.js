import BASE_URL from './config.js';

async function apiGet(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  return response.json();
}

async function apiPost(path, body) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response.json();
}

// ============================================================
// AUTH
// ============================================================

// Used by: Signup.jsx
export async function signup(name, email, password) {
  return apiPost('auth?action=signup', { name, email, password });
}

// Used by: LoginPage.jsx
export async function login(identifier, password) {
  return apiPost('auth?action=login', { identifier, password });
}

// ============================================================
// HEARTBEAT / ONLINE STATUS
// ============================================================

// Used by: Heartbeat.jsx
export async function heartbeat(username, online = true) {
  try {
    await apiPost('heartbeat', { username, online });
  } catch (error) {
    console.error('Heartbeat error:', error.message);
  }
}

// ============================================================
// LEADERBOARD
// ============================================================

// Used by: LeaderboardPage.jsx
export async function getLeaderboard() {
  return apiGet('leaderboard');
}

// ============================================================
// STATISTICS
// ============================================================

// Used by: LeaderboardPage.jsx, AllFriendsPage.jsx
export async function getPublicStats(userId) {
  return apiGet(`stats?userId=${userId}`);
}

// Used by: ProfilePage.jsx
export async function getMyStats(userId) {
  return apiGet(`stats?userId=${userId}&mode=mine`);
}

// Used by: ProfilePage.jsx
export async function toggleHideStats(userId) {
  return apiPost('stats?action=toggle-hide', { userId });
}

// ============================================================
// GAME TRACKING
// ============================================================

export async function recordGameWon(userId) {
  return apiPost('games?action=won', { userId });
}

export async function recordGamePlayed(userId) {
  return apiPost('games?action=played', { userId });
}

// ============================================================
// FRIENDS
// ============================================================

// Used by: ProfilePage.jsx, AllFriendsPage.jsx
export async function getFriends(userId) {
  try {
    return await apiGet(`friends?userId=${userId}`);
  } catch (error) {
    return [];
  }
}

// Used by: addfriends.jsx
export async function getAllUsers() {
  try {
    return await apiGet('friends?action=all');
  } catch (error) {
    return [];
  }
}

// Used by: addfriends.jsx
export async function sendFriendRequest(userId, requestedId) {
  return apiPost('friends?action=request', { userId, requestedId });
}

// Used by: PendingRequestsPage.jsx
export async function getPendingRequests(userId) {
  try {
    return await apiGet(`friends?action=pending&userId=${userId}`);
  } catch (error) {
    return [];
  }
}

// Used by: PendingRequestsPage.jsx
export async function acceptFriendRequest(userId, requesterId) {
  return apiPost('friends?action=accept', { userId, requesterId });
}

// Used by: PendingRequestsPage.jsx
export async function deleteFriendRequest(userId, requesterId) {
  return apiPost('friends?action=decline', { userId, requesterId });
}

// Used by: AllFriendsPage.jsx
export async function removeFriend(user1, user2) {
  return apiPost('friends?action=remove', { user1, user2 });
}

// ============================================================
// PROFILE PICTURE
// ============================================================

// Used by: UploadPFP.jsx
export async function uploadProfilePicture(userId, file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return apiPost('profile-picture', { userId, filename: file.name, dataUrl });
}

// Used by: UploadPFP.jsx on load
export async function getProfilePicture(userId) {
  return apiGet(`profile-picture?userId=${userId}`);
}

// ============================================================
// USER SETTINGS
// ============================================================

// Used by: UserSettings.jsx
export async function fetchEmail(username) {
  return apiGet(`auth?action=fetch-email&username=${encodeURIComponent(username)}`);
}

// Used by: CheckPassPopup.jsx, PasswordPopup.jsx
export async function validatePassword(username, password) {
  return apiPost('auth?action=validate-password', { username, password });
}

// Used by: UsernamePopup.jsx
export async function changeUsername(oldUsername, newUsername) {
  return apiPost('auth?action=change-username', { oldUsername, newUsername });
}

// Used by: EmailPopup.jsx
export async function changeEmail(username, newEmail) {
  return apiPost('auth?action=change-email', { username, newEmail });
}

// Used by: PasswordPopup.jsx
export async function changePassword(username, newPassword) {
  return apiPost('auth?action=change-password', { username, newPassword });
}

// ============================================================
// LOBBY
// ============================================================
// See lobby.jsx — uses BASE_URL + 'lobby?action=status|join|leave' directly,
// polling client/api/lobby.js.
