import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connection = await pool.getConnection();

    console.log(" MySQL Database Connected Successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(` Server running successfully on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(" Failed to connect to database");

    console.log("Error Message:", error.message);

    console.error(error);

    process.exit(1);
  }
};

startServer();
