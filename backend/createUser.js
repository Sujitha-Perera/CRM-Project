import bcrypt from "bcryptjs";
import pool from "./src/config/db.js";

const createUser = async () => {
  const hash = await bcrypt.hash("password123", 10);

  await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    ["sujitha", "admin@example.com", hash]
  );
  console.log(process.env.DB_NAME);
  console.log("User created successfully");
};

createUser();