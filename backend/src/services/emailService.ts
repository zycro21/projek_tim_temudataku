// backend\src\services\emailService.ts
import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Setup nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: `"Temu Dataku" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verifikasi Email Anda',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Verifikasi Email Anda</h2>
          <p style="color: #555; font-size: 16px;">Terima kasih telah mendaftar di Temu Dataku.</p>
          <p style="color: #555; font-size: 16px;">Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verifikasi Email</a>
          </div>
          <p style="color: #555; font-size: 16px;">Atau, Anda dapat menyalin dan menempelkan link berikut di browser Anda:</p>
          <p style="color: #555; font-size: 14px; word-break: break-all;">${verificationLink}</p>
          <p style="color: #555; font-size: 16px;">Link ini akan kedaluwarsa dalam 24 jam.</p>
          <p style="color: #555; font-size: 16px;">Jika Anda tidak mendaftar di Temu Dataku, silakan abaikan email ini.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #999; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} Temu Dataku. Semua hak dilindungi.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: `"Temu Dataku" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password Anda',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Reset Password Anda</h2>
          <p style="color: #555; font-size: 16px;">Kami menerima permintaan untuk reset password akun Anda.</p>
          <p style="color: #555; font-size: 16px;">Silakan klik tombol di bawah ini untuk reset password Anda:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          </div>
          <p style="color: #555; font-size: 16px;">Atau, Anda dapat menyalin dan menempelkan link berikut di browser Anda:</p>
          <p style="color: #555; font-size: 14px; word-break: break-all;">${resetLink}</p>
          <p style="color: #555; font-size: 16px;">Link ini akan kedaluwarsa dalam 1 jam.</p>
          <p style="color: #555; font-size: 16px;">Jika Anda tidak meminta reset password, silakan abaikan email ini.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #999; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} Temu Dataku. Semua hak dilindungi.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

async sendSessionReminderEmail(
  email: string,
  sessionStartTime: Date,
  mentorName: string,
  sessionTitle: string
): Promise<void> {
  const formattedTime = sessionStartTime.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const mailOptions = {
    from: `"Temu Dataku" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Pengingat Sesi Mentoring',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; text-align: center;">Pengingat Sesi Mentoring</h2>
        <p style="color: #555; font-size: 16px;">Halo,</p>
        <p style="color: #555; font-size: 16px;">Kami ingin mengingatkan Anda bahwa sesi mentoring "${sessionTitle}" dengan ${mentorName} akan segera dimulai.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="color: #333; font-weight: bold; margin: 0 0 10px 0;">Detail Sesi:</p>
          <p style="color: #555; margin: 5px 0;">Waktu: ${formattedTime}</p>
        </div>
        <p style="color: #555; font-size: 16px;">Harap siap beberapa menit sebelum sesi dimulai untuk memastikan kelancaran pertemuan.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #999; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} Temu Dataku. Semua hak dilindungi.</p>
      </div>
    `,
  };

  try {
    await this.transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending session reminder email:', error);
    throw new Error('Failed to send session reminder email');
  }
}

async sendFeedbackReminderEmail(
    email: string,
    sessionTitle: string
  ): Promise<void> {
    const feedbackLink = `${process.env.FRONTEND_URL}/dashboard/feedback`;

    const mailOptions = {
      from: `"Temu Dataku" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Beri Rating untuk Sesi Mentoring',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Beri Rating untuk Sesi Mentoring</h2>
          <p style="color: #555; font-size: 16px;">Halo,</p>
          <p style="color: #555; font-size: 16px;">Terima kasih telah mengikuti sesi mentoring "${sessionTitle}".</p>
          <p style="color: #555; font-size: 16px;">Kami sangat menghargai jika Anda dapat memberikan rating dan feedback untuk sesi tersebut. Feedback Anda sangat berharga untuk meningkatkan kualitas layanan kami.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${feedbackLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Beri Rating & Feedback</a>
          </div>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
          <p style="color: #999; font-size: 14px; text-align: center;">© ${new Date().getFullYear()} Temu Dataku. Semua hak dilindungi.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending feedback reminder email:', error);
      throw new Error('Failed to send feedback reminder email');
    }
  }
}

export default new EmailService();