import { sql } from './_db.js';

async function getStatus() {
  const rows = await sql`
    SELECT l.id,
      COALESCE(array_agg(p.username) FILTER (WHERE p.username IS NOT NULL), '{}') AS players
    FROM lobby l
    LEFT JOIN lobby_players p ON p.lobby_id = l.id
    GROUP BY l.id
    ORDER BY l.id
  `;
  return rows.map(r => ({ id: r.id, players: r.players }));
}

export default async function handler(req, res) {
  try {
    const { action } = req.query;

    if (req.method === 'GET' && action === 'status') {
      return res.status(200).json({ lobbies: await getStatus() });
    }

    if (req.method === 'POST' && action === 'join') {
      const { username } = req.body;

      const already = await sql`SELECT lobby_id FROM lobby_players WHERE username = ${username} LIMIT 1`;
      if (!already[0]) {
        const open = await sql`
          SELECT l.id FROM lobby l
          WHERE (SELECT count(*) FROM lobby_players p WHERE p.lobby_id = l.id) < 4
          ORDER BY l.id LIMIT 1
        `;

        let lobbyId = open[0]?.id;
        if (!lobbyId) {
          const created = await sql`INSERT INTO lobby DEFAULT VALUES RETURNING id`;
          lobbyId = created[0].id;
        }

        await sql`INSERT INTO lobby_players (lobby_id, username) VALUES (${lobbyId}, ${username})`;
      }

      return res.status(200).json({ status: 'joined', lobbies: await getStatus() });
    }

    if (req.method === 'POST' && action === 'leave') {
      const { username } = req.body;

      await sql`DELETE FROM lobby_players WHERE username = ${username}`;
      await sql`DELETE FROM lobby WHERE id NOT IN (SELECT DISTINCT lobby_id FROM lobby_players)`;

      return res.status(200).json({ status: 'left', lobbies: await getStatus() });
    }

    return res.status(400).json({ error: 'Unknown action.' });
  } catch (error) {
    console.error('lobby error:', error);
    return res.status(500).json({ error: 'Server error.' });
  }
}
