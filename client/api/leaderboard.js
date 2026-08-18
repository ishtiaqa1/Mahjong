import { sql } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed.' });

  try {
    const rows = await sql`
      SELECT ug.user_id, ug.games_won, u.name
      FROM user_games ug
      JOIN users u ON u.id = ug.user_id
      ORDER BY ug.games_won DESC
      LIMIT 10
    `;

    const empty = { name: '', id: -1, wins: 0 };
    const leaderboard = {};
    for (let i = 1; i <= 10; i++) leaderboard[i] = { ...empty };

    rows.forEach((row, i) => {
      leaderboard[i + 1] = {
        id: row.user_id,
        name: row.name ?? '',
        wins: row.games_won,
      };
    });

    return res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    console.error('leaderboard error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
