import { sql } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed.' });

  try {
    const { action } = req.query;
    const { userId } = req.body;
    if (action !== 'won' && action !== 'played') {
      return res.status(400).json({ success: false, message: 'Unknown action.' });
    }

    const existing = await sql`SELECT id FROM user_games WHERE user_id = ${userId} LIMIT 1`;

    if (existing[0]) {
      if (action === 'won') {
        await sql`UPDATE user_games SET games_won = games_won + 1 WHERE user_id = ${userId}`;
      } else {
        await sql`UPDATE user_games SET games_played = games_played + 1 WHERE user_id = ${userId}`;
      }
    } else {
      const gamesPlayed = action === 'played' ? 1 : 0;
      const gamesWon = action === 'won' ? 1 : 0;
      await sql`INSERT INTO user_games (user_id, games_played, games_won) VALUES (${userId}, ${gamesPlayed}, ${gamesWon})`;
    }

    const message = action === 'won' ? 'Games won updated.' : 'Games played updated.';
    return res.status(200).json({ success: true, message });
  } catch (error) {
    console.error('games error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
