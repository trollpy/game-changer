import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiver, content, listing } = req.body;

  const message = new Message({
    sender: req.user._id,
    receiver,
    content,
    listing
  });

  const savedMessage = await message.save();
  
  // Create notification for receiver
  const sender = await User.findById(req.user._id);
  await Notification.create({
    user: receiver,
    message: `New message from ${sender.firstName}`,
    type: 'message',
    relatedId: savedMessage._id
  });

  res.status(201).json(savedMessage);
});

// @desc    Get all messages between two users
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.userId },
      { sender: req.params.userId, receiver: req.user._id }
    ]
  }).sort({ createdAt: 1 });

  // Mark messages as read
  await Message.updateMany(
    { receiver: req.user._id, sender: req.params.userId, read: false },
    { $set: { read: true } }
  );

  res.json(messages);
});

// @desc    Get all conversations for a user
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = asyncHandler(async (req, res) => {
  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: req.user._id },
          { receiver: req.user._id }
        ]
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$sender", req.user._id] },
            "$receiver",
            "$sender"
          ]
        },
        lastMessage: { $first: "$$ROOT" },
        unreadCount: {
          $sum: {
            $cond: [
              { $and: [
                { $eq: ["$receiver", req.user._id] },
                { $eq: ["$read", false] }
              ]},
              1,
              0
            ]
          }
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: 0,
        userId: "$_id",
        firstName: "$user.firstName",
        lastName: "$user.lastName",
        profilePicture: "$user.profilePicture",
        lastMessage: 1,
        unreadCount: 1
      }
    }
  ]);

  res.json(conversations);
});

export { sendMessage, getMessages, getConversations };