import app from "./app";
import pool from "./db";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// menghubungkan ke database
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

// menjalankan server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
