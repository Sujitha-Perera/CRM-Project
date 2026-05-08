import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return users[0] ?? null;
};
