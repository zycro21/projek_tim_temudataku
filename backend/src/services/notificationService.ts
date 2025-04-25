import { PrismaClient, notifications as PrismaNotification } from '@prisma/client';
import { BadRequestError, NotFoundError } from '../utils/errorTypes';
import prisma from '../config/prisma';
import emailService from './emailService';

// Gunakan tipe dari Prisma untuk notifications
type DatabaseNotification = PrismaNotification;

/**
 * Send email notification for mentoring session reminder
 */
export const sendSessionReminderEmail = async (
  email: string,
  sessionStartTime: Date,
  mentorName: string,
  sessionTitle: string
): Promise<void> => {
  try {
    // Gunakan metode di emailService untuk mengirim email
    // Perlu menambahkan metode ini di emailService
    await emailService.sendSessionReminderEmail(email, sessionStartTime, mentorName, sessionTitle);
  } catch (error) {
    console.error('Error sending session reminder email:', error);
    throw new Error('Failed to send session reminder email');
  }
};

/**
 * Send email notification for feedback reminder
 */
export const sendFeedbackReminderEmail = async (
  email: string,
  sessionTitle: string
): Promise<void> => {
  try {
    // Gunakan metode di emailService untuk mengirim email
    // Perlu menambahkan metode ini di emailService
    await emailService.sendFeedbackReminderEmail(email, sessionTitle);
  } catch (error) {
    console.error('Error sending feedback reminder email:', error);
    throw new Error('Failed to send feedback reminder email');
  }
};

/**
 * Get all notifications by user ID
 */
export const getNotificationsByUserId = async (userId: number): Promise<DatabaseNotification[]> => {
  try {
    return await prisma.notifications.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        created_date: 'desc'
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Get notification by ID
 */
export const getNotificationById = async (id: number): Promise<DatabaseNotification | null> => {
  try {
    const notification = await prisma.notifications.findUnique({
      where: { id }
    });
    
    return notification;
  } catch (error) {
    console.error('Error fetching notification:', error);
    throw error;
  }
};

/**
 * Create a new notification
 */
export const createNotification = async (data: {
  user_id: number;
  type: string;
  title: string;
  message?: string;
}): Promise<DatabaseNotification> => {
  try {
    // Validate required fields
    if (!data.user_id || !data.type || !data.title) {
      throw new BadRequestError('User ID, type, and title are required');
    }

    // Perlu menyertakan ID karena model menggunakan ID eksplisit bukan auto-increment
    const lastNotification = await prisma.notifications.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
    
    const newId = lastNotification ? lastNotification.id + 1 : 1;
    
    return await prisma.notifications.create({
      data: {
        id: newId,
        user_id: data.user_id,
        type: data.type,
        title: data.title,
        message: data.message || null,
        is_read: false,
        created_date: new Date(),
        created_at: new Date()
      }
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Update a notification
 */
export const updateNotification = async (
  id: number,
  data: Partial<{
    type: string;
    title: string;
    message: string;
    is_read: boolean;
  }>
): Promise<DatabaseNotification> => {
  try {
    // Check if notification exists
    const existingNotification = await prisma.notifications.findUnique({
      where: { id }
    });

    if (!existingNotification) {
      throw new NotFoundError('Notification not found');
    }

    // Hapus updated_at karena tidak ada di model
    return await prisma.notifications.update({
      where: { id },
      data: {
        ...data
      }
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

/**
 * Mark a notification as read
 */
export const markAsRead = async (id: number): Promise<DatabaseNotification> => {
  try {
    // Check if notification exists
    const existingNotification = await prisma.notifications.findUnique({
      where: { id }
    });

    if (!existingNotification) {
      throw new NotFoundError('Notification not found');
    }

    return await prisma.notifications.update({
      where: { id },
      data: {
        is_read: true
      }
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read for a user
 */
export const markAllAsRead = async (userId: number): Promise<void> => {
  try {
    await prisma.notifications.updateMany({
      where: {
        user_id: userId,
        is_read: false
      },
      data: {
        is_read: true
      }
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (id: number): Promise<void> => {
  try {
    // Check if notification exists
    const existingNotification = await prisma.notifications.findUnique({
      where: { id }
    });

    if (!existingNotification) {
      throw new NotFoundError('Notification not found');
    }

    await prisma.notifications.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

/**
 * Delete all notifications for a user
 */
export const deleteAllNotifications = async (userId: number): Promise<void> => {
  try {
    await prisma.notifications.deleteMany({
      where: {
        user_id: userId
      }
    });
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    throw error;
  }
};

/**
 * Create mentoring session reminder notification
 */
export const createSessionReminderNotification = async (
  userId: number,
  sessionId: number,
  sessionStartTime: Date
): Promise<DatabaseNotification> => {
  const formattedTime = sessionStartTime.toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return await createNotification({
    user_id: userId,
    type: 'session_reminder',
    title: 'Pengingat Sesi Mentoring',
    message: `Sesi mentoring Anda akan dimulai pada ${formattedTime}. Harap siap beberapa menit sebelumnya.`
  });
};

/**
 * Create feedback reminder notification
 */
export const createFeedbackReminderNotification = async (
  userId: number,
  sessionId: number
): Promise<DatabaseNotification> => {
  return await createNotification({
    user_id: userId,
    type: 'feedback_reminder',
    title: 'Beri Rating untuk Sesi Mentoring',
    message: 'Sesi mentoring Anda telah selesai. Mohon berikan rating dan feedback untuk membantu meningkatkan kualitas layanan kami.'
  });
};

/**
 * Create new feedback notification for mentor
 */
export const createNewFeedbackNotification = async (
  mentorId: number,
  rating: number,
  sessionId: number
): Promise<DatabaseNotification> => {
  return await createNotification({
    user_id: mentorId,
    type: 'new_feedback',
    title: 'Feedback Baru Diterima',
    message: `Anda telah menerima rating ${rating}/5 untuk sesi mentoring yang lalu. Periksa halaman feedback untuk melihat selengkapnya.`
  });
};