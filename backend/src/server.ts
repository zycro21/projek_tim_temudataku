import app from "./app";
import prisma from "./config/prisma";

// Fungsi untuk menghubungkan ke database via Prisma
const connectDB = async () => {
  try {
    await prisma.$connect();
    
    // Verifikasi koneksi dengan query sederhana
    await prisma.$queryRaw`SELECT 1+1 AS result`;
    
    console.log("🔌 Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  // Tutup server dengan baik
  process.exit(1);
});

// Handle SIGTERM signal
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  // Tutup database connection dan server dengan baik
  prisma.$disconnect().then(() => {
    process.exit(0);
  });
});

// Fungsi untuk menjalankan server
const startServer = async () => {
  await connectDB();
  
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`
    🚀 Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}
    🔗 API available at http://localhost:${PORT}/api
    `);
  });
};

// Jalankan server
startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
});