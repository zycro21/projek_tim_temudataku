import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../utils/responseFormatter';
import * as notificationService from '../services/notificationService';
import { BadRequestError, NotFoundError } from '../utils/errorTypes';

// Get all notifications for logged in user
export const getAllNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID is required');
    }

    const notifications = await notificationService.getNotificationsByUserId(userId);
    formatResponse(res, 'Notifications retrieved successfully', notifications);
  } catch (error) {
    next(error);
  }
};

// Get a notification by id
export const getNotificationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notificationId = Number(req.params.id);
    if (isNaN(notificationId)) {
      throw new BadRequestError('Invalid notification ID');
    }

    const notification = await notificationService.getNotificationById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    formatResponse(res, 'Notification retrieved successfully', notification);
  } catch (error) {
    next(error);
  }
};

// Create a new notification
export const createNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notificationData = req.body;
    const newNotification = await notificationService.createNotification(notificationData);
    formatResponse(res, 'Notification created successfully', newNotification, 201);
  } catch (error) {
    next(error);
  }
};

// Update a notification
export const updateNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notificationId = Number(req.params.id);
    if (isNaN(notificationId)) {
      throw new BadRequestError('Invalid notification ID');
    }

    const notificationData = req.body;
    const updatedNotification = await notificationService.updateNotification(notificationId, notificationData);
    
    formatResponse(res, 'Notification updated successfully', updatedNotification);
  } catch (error) {
    next(error);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notificationId = Number(req.params.id);
    if (isNaN(notificationId)) {
      throw new BadRequestError('Invalid notification ID');
    }

    const updatedNotification = await notificationService.markAsRead(notificationId);
    formatResponse(res, 'Notification marked as read', updatedNotification);
  } catch (error) {
    next(error);
  }
};

// Mark all notifications as read for a user
export const markAllNotificationsAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID is required');
    }

    await notificationService.markAllAsRead(userId);
    formatResponse(res, 'All notifications marked as read', null);
  } catch (error) {
    next(error);
  }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notificationId = Number(req.params.id);
    if (isNaN(notificationId)) {
      throw new BadRequestError('Invalid notification ID');
    }

    await notificationService.deleteNotification(notificationId);
    formatResponse(res, 'Notification deleted successfully', null);
  } catch (error) {
    next(error);
  }
};

// Delete all notifications for a user
export const deleteAllNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestError('User ID is required');
    }

    await notificationService.deleteAllNotifications(userId);
    formatResponse(res, 'All notifications deleted successfully', null);
  } catch (error) {
    next(error);
  }
};