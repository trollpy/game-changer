import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['message', 'listing', 'market', 'system'],
    required: true 
  },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;