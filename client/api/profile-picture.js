import { put } from '@vercel/blob';
import { sql } from './_db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const rows = await sql`SELECT pfp_path FROM users WHERE id = ${userId} LIMIT 1`;
      const user = rows[0];
      if (!user?.pfp_path) return res.status(200).json({ success: true, filepath: '' });
      return res.status(200).json({ success: true, filepath: user.pfp_path });
    }

    if (req.method === 'POST') {
      const { userId, filename, dataUrl } = req.body;

      const match = /^data:(.+);base64,(.*)$/.exec(dataUrl || '');
      if (!match) return res.status(400).json({ success: false, message: 'Invalid image data.' });

      const [, contentType, base64] = match;
      const buffer = Buffer.from(base64, 'base64');
      const ext = (filename || '').split('.').pop() || 'jpg';
      const path = `profile-pictures/${userId}.${ext}`;

      const blob = await put(path, buffer, { access: 'public', contentType, allowOverwrite: true });

      await sql`UPDATE users SET pfp_path = ${blob.url} WHERE id = ${userId}`;

      return res.status(200).json({ success: true, filepath: blob.url });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  } catch (error) {
    console.error('profile-picture error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
