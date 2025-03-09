import app from "./app";
import { Pool } from "pg";

// Konfigurasi koneksi PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT) || 5432,
});

// Fungsi untuk menghubungkan ke database
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("🔌 Database connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
};

// Fungsi untuk menjalankan server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

// Jalankan server
startServer();
