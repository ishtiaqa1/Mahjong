import { sql } from './_db.js';

export default async function handler(req, res) {
  try {
    const { action } = req.query;

    if (req.method === 'GET' && action === 'all') {
      const rows = await sql`SELECT id, name FROM users`;
      return res.status(200).json(rows);
    }

    if (req.method === 'GET' && action === 'pending') {
      const { userId } = req.query;
      const rows = await sql`
        SELECT u.id, u.name
        FROM requests r
        JOIN users u ON u.id = r."user"
        WHERE r.request = ${userId}
      `;
      return res.status(200).json(rows);
    }

    if (req.method === 'GET') {
      const { userId } = req.query;
      const now = Math.floor(Date.now() / 1000);

      const rows = await sql`
        SELECT u.id, u.name, u.last_access_time
        FROM friends f
        JOIN users u ON u.id = f.user2
        WHERE f.user1 = ${userId}
      `;

      return res.status(200).json(rows.map(row => ({
        id: row.id,
        name: row.name,
        online: now - (row.last_access_time ?? 0) < 180,
      })));
    }

    if (req.method === 'POST' && action === 'request') {
      const { userId, requestedId } = req.body;
      if (String(userId) === String(requestedId)) {
        return res.status(200).json({ success: false, message: 'You cannot send a friend request to yourself.' });
      }

      try {
        await sql`INSERT INTO requests ("user", request) VALUES (${userId}, ${requestedId})`;
      } catch (error) {
        if (error.code === '23505') return res.status(200).json({ success: false, message: 'Friend request already sent.' });
        throw error;
      }
      return res.status(200).json({ success: true, message: 'Friend request sent successfully.' });
    }

    if (req.method === 'POST' && action === 'accept') {
      const { userId, requesterId } = req.body;

      await sql`
        INSERT INTO friends (user1, user2) VALUES
          (${userId}, ${requesterId}),
          (${requesterId}, ${userId})
      `;
      await sql`DELETE FROM requests WHERE "user" = ${requesterId} AND request = ${userId}`;

      return res.status(200).json({ success: true, message: 'Friend request accepted.' });
    }

    if (req.method === 'POST' && action === 'decline') {
      const { userId, requesterId } = req.body;
      await sql`DELETE FROM requests WHERE "user" = ${requesterId} AND request = ${userId}`;
      return res.status(200).json({ success: true, message: 'Friend request declined.' });
    }

    if (req.method === 'POST' && action === 'remove') {
      const { user1, user2 } = req.body;
      await sql`
        DELETE FROM friends
        WHERE (user1 = ${user1} AND user2 = ${user2})
           OR (user1 = ${user2} AND user2 = ${user1})
      `;
      return res.status(200).json({ success: true, message: 'Friend removed successfully.' });
    }

    return res.status(400).json({ success: false, message: 'Unknown request.' });
  } catch (error) {
    console.error('friends error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
