-- Run this against the Neon database (e.g. `psql "$DATABASE_URL" -f client/db/schema.sql`)
-- before migrating data over from Supabase.

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_access_time BIGINT DEFAULT 0,
  "Hide_stats" SMALLINT DEFAULT 0,
  pfp_path TEXT
);

CREATE TABLE IF NOT EXISTS user_games (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  games_played INT DEFAULT 0,
  games_won INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS friends (
  user1 BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2 BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (user1, user2)
);

CREATE TABLE IF NOT EXISTS requests (
  "user" BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  request BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY ("user", request)
);

-- Backs the polling-based lobby (client/api/lobby.js), replacing the old
-- update-lobby.php + Supabase Realtime plan.
CREATE TABLE IF NOT EXISTS lobby (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lobby_players (
  lobby_id BIGINT NOT NULL REFERENCES lobby(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT now()
);
