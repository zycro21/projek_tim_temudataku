import { PrismaClient } from '@prisma/client';
// Untuk mengakses process.exit
const prisma = new PrismaClient();

/**
 * Seed data untuk notifikasi
 */
async function seedNotifications() {
  try {
    console.log('Mulai seeding notifikasi...');
    
    // Dapatkan beberapa user dari database
    const users = await prisma.user.findMany({
      take: 5, // Ambil 5 user untuk diberi notifikasi
      orderBy: {
        id: 'asc'
      }
    });

    if (users.length === 0) {
      console.log('Tidak ada user ditemukan. Seed user terlebih dahulu');
      return;
    }

    // Dapatkan notifikasi terakhir untuk ID baru
    const lastNotification = await prisma.notification.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    
    let notificationId = lastNotification ? lastNotification.id + 1 : 1;
    
    // Tipe notifikasi
    const notificationTypes = [
      'info', 
      'warning', 
      'success', 
      'session_reminder', 
      'feedback_reminder', 
      'new_feedback'
    ];

    // Tanggal untuk notifikasi
    const now = new Date();
    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);
    
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);
    
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    // Array untuk menyimpan data notifikasi
    const notificationsData: {
      id: number;
      user_id: number;
      type: string;
      title: string;
      message: string;
      is_read: boolean;
      created_date: Date;
      created_at: Date;
    }[] = [];

    // Buat 5 notifikasi untuk setiap user
    for (const user of users) {
      // Notifikasi info
      notificationsData.push({
        id: notificationId++,
        user_id: user.id,
        type: 'info',
        title: 'Selamat Datang di Temu Dataku',
        message: 'Terima kasih telah mendaftar. Jelajahi platform kami untuk menemukan mentor terbaik!',
        is_read: false,
        created_date: now,
        created_at: now
      });

      // Notifikasi session_reminder
      notificationsData.push({
        id: notificationId++,
        user_id: user.id,
        type: 'session_reminder',
        title: 'Pengingat Sesi Mentoring',
        message: 'Sesi mentoring Anda akan dimulai 1 jam lagi. Harap siap beberapa menit sebelumnya.',
        is_read: Math.random() > 0.5, // 50% chance to be read
        created_date: oneDayAgo,
        created_at: oneDayAgo
      });

      // Notifikasi warning
      notificationsData.push({
        id: notificationId++,
        user_id: user.id,
        type: 'warning',
        title: 'Perbarui Profil Anda',
        message: 'Profil Anda belum lengkap. Lengkapi profil untuk pengalaman yang lebih baik.',
        is_read: Math.random() > 0.7, // 30% chance to be read
        created_date: threeDaysAgo,
        created_at: threeDaysAgo
      });

      // Notifikasi feedback_reminder
      notificationsData.push({
        id: notificationId++,
        user_id: user.id,
        type: 'feedback_reminder',
        title: 'Berikan Feedback untuk Sesi Mentoring',
        message: 'Sesi mentoring Anda telah selesai. Mohon berikan rating dan feedback.',
        is_read: true,
        created_date: oneWeekAgo,
        created_at: oneWeekAgo
      });

      // Notifikasi success
      notificationsData.push({
        id: notificationId++,
        user_id: user.id,
        type: 'success',
        title: 'Pembayaran Berhasil',
        message: 'Pembayaran untuk sesi mentoring Anda telah berhasil. Terima kasih!',
        is_read: false,
        created_date: now,
        created_at: now
      });
    }

    // Masukkan semua notifikasi ke database
    await prisma.notification.createMany({
      data: notificationsData,
      skipDuplicates: true // Skip jika ada ID yang duplikat
    });

    console.log(`Berhasil menambahkan ${notificationsData.length} notifikasi`);
  } catch (error) {
    console.error('Error saat melakukan seed notifikasi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Eksekusi fungsi seeding
seedNotifications()
  .then(() => {
    console.log('Seeding notifikasi selesai');
  })
  .catch((e) => {
    console.error('Error saat seeding notifikasi:', e);
  });