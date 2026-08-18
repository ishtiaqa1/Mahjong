import bcrypt from 'bcryptjs';
import { sql } from './_db.js';

export default async function handler(req, res) {
  const action = req.query.action;

  try {
    if (action === 'signup' && req.method === 'POST') {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;
      } catch (error) {
        if (error.code === '23505') {
          if (String(error.message).includes('email')) {
            return res.status(200).json({ success: false, message: 'Email already in use.' });
          }
          return res.status(200).json({ success: false, message: 'Username already taken.' });
        }
        throw error;
      }
      return res.status(200).json({ success: true, message: 'User registered successfully!' });
    }

    if (action === 'login' && req.method === 'POST') {
      const { identifier, password } = req.body;

      const rows = await sql`SELECT * FROM users WHERE email = ${identifier} OR name = ${identifier} LIMIT 1`;
      const user = rows[0];
      if (!user) return res.status(200).json({ success: false, message: 'User not found.' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(200).json({ success: false, message: 'Invalid password.' });

      await sql`UPDATE users SET last_access_time = ${Math.floor(Date.now() / 1000)} WHERE id = ${user.id}`;

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        user: { id: user.id, name: user.name, email: user.email },
      });
    }

    if (action === 'validate-password' && req.method === 'POST') {
      const { username, password } = req.body;
      const rows = await sql`SELECT password FROM users WHERE name = ${username} LIMIT 1`;
      const user = rows[0];
      if (!user) return res.status(200).json({ success: false, message: 'User not found.' });

      const match = await bcrypt.compare(password, user.password);
      return res.status(200).json(
        match ? { success: true, message: 'Passwords match.' } : { success: false, message: 'Invalid password.' }
      );
    }

    if (action === 'change-password' && req.method === 'POST') {
      const { username, newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await sql`UPDATE users SET password = ${hashedPassword} WHERE name = ${username}`;
      return res.status(200).json({ success: true, message: 'Password changed.' });
    }

    if (action === 'change-username' && req.method === 'POST') {
      const { oldUsername, newUsername } = req.body;
      try {
        await sql`UPDATE users SET name = ${newUsername} WHERE name = ${oldUsername}`;
      } catch (error) {
        if (error.code === '23505') return res.status(200).json({ success: false, message: 'Username already taken.' });
        throw error;
      }
      return res.status(200).json({ success: true, message: 'Username changed.', newuser: newUsername });
    }

    if (action === 'change-email' && req.method === 'POST') {
      const { username, newEmail } = req.body;
      try {
        await sql`UPDATE users SET email = ${newEmail} WHERE name = ${username}`;
      } catch (error) {
        if (error.code === '23505') return res.status(200).json({ success: false, message: 'Email already in use.' });
        throw error;
      }
      return res.status(200).json({ success: true, message: 'Email changed.' });
    }

    if (action === 'fetch-email' && req.method === 'GET') {
      const { username } = req.query;
      const rows = await sql`SELECT email FROM users WHERE name = ${username} LIMIT 1`;
      const user = rows[0];
      if (!user) return res.status(200).json({ success: false, message: 'User not found.' });
      return res.status(200).json({ success: true, data: { email: user.email } });
    }

    return res.status(400).json({ success: false, message: 'Unknown action.' });
  } catch (error) {
    console.error('auth error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
