import { sql } from './_db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed.' });

  try {
    const { username, online = true } = req.body;
    const timestamp = online ? Math.floor(Date.now() / 1000) : 1;

    await sql`UPDATE users SET last_access_time = ${timestamp} WHERE name = ${username}`;
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('heartbeat error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
