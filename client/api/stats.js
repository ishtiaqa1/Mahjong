import { sql } from './_db.js';

async function getStatsForUser(userId) {
  const rows = await sql`SELECT games_played, games_won FROM user_games WHERE user_id = ${userId} LIMIT 1`;
  const row = rows[0];
  const games = row?.games_played ?? 0;
  const wins = row?.games_won ?? 0;
  let rank = 0;

  if (wins > 0) {
    const ranked = await sql`SELECT user_id FROM user_games ORDER BY games_won DESC`;
    const pos = ranked.findIndex(r => String(r.user_id) === String(userId));
    if (pos !== -1) rank = pos + 1;
  }

  return { games, wins, rank };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId, mode } = req.query;

      if (mode === 'mine') {
        return res.status(200).json({ success: true, data: await getStatsForUser(userId) });
      }

      // public stats — respects Hide_stats
      const rows = await sql`SELECT "Hide_stats" FROM users WHERE id = ${userId} LIMIT 1`;
      const user = rows[0];
      if (!user) return res.status(200).json({ success: false, message: 'User not found.' });
      if (user.Hide_stats === 1) return res.status(200).json({ success: false, message: 'User statistics are hidden.' });

      return res.status(200).json({ success: true, data: await getStatsForUser(userId) });
    }

    if (req.method === 'POST' && req.query.action === 'toggle-hide') {
      const { userId } = req.body;
      const rows = await sql`SELECT "Hide_stats" FROM users WHERE id = ${userId} LIMIT 1`;
      const user = rows[0];
      if (!user) return res.status(200).json({ success: false, message: 'User not found.' });

      const newValue = user.Hide_stats === 1 ? 0 : 1;
      await sql`UPDATE users SET "Hide_stats" = ${newValue} WHERE id = ${userId}`;
      return res.status(200).json({ success: true, new_value: newValue });
    }

    return res.status(400).json({ success: false, message: 'Unknown request.' });
  } catch (error) {
    console.error('stats error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
