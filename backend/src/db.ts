import { Pool } from "pg";
import dotenv from "dotenv";

// Perbaiki path kalau file ini di dalam subfolder
dotenv.config({ path: __dirname + "/../.env" }); // Lebih aman pakai __dirname

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
