import app from "./app";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

const USE_PRISMA = process.env.USE_PRISMA === "true";

if (USE_PRISMA) {
  // Pakai Prisma
  import("./config/prisma").then(({ default: prisma }) => {
    const connectDB = async () => {
      try {
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1+1 AS result`; // Mengecek koneksi
        console.log("🔌 Connected to database using Prisma");
      } catch (err) {
        console.error("Database connection error (Prisma):", err);
        process.exit(1);
      }
    };

    process.on("SIGTERM", async () => {
      console.log("👋 SIGTERM received. Shutting down...");
      await prisma.$disconnect();
      process.exit(0);
    });

    startServer(connectDB);
  });
} else {
  // Pakai Pool dari pg (Native Query)
  import("./db").then(({ default: pool }) => {
    const connectDB = async () => {
      try {
        const client = await pool.connect();
        console.log("🔌 Connected to database using pg (Pool)");
        client.release();
      } catch (err) {
        console.error("Database connection error (pg):", err);
        process.exit(1);
      }
    };

    startServer(connectDB);
  });
}

// Fungsi untuk menjalankan server
const startServer = async (connectDB: () => Promise<void>) => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};