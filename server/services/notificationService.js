import Notification from '../models/Notification.js';
import User from '../models/User.js';

export const createNotification = async (userId, message, type, relatedId) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message,
      type,
      relatedId
    });

    // In a real app, you would emit a socket event here
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId, readStatus) => {
  try {
    const query = { user: userId };
    if (readStatus !== undefined) query.read = readStatus;

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markAsRead = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { $set: { read: true } },
      { new: true }
    );

    return notification;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};