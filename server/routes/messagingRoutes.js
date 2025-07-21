import express from 'express';
import { 
  sendMessage, 
  getMessages, 
  getConversations 
} from '../controllers/messagingController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getMessages);

export default router;