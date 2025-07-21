import express from 'express';
import { 
  getMarketPrices, 
  getLatestMarketPrices, 
  addMarketPrice, 
  updateMarketPrice, 
  deleteMarketPrice 
} from '../controllers/marketPriceController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getMarketPrices)
  .post(protect, admin, addMarketPrice);

router.get('/latest', getLatestMarketPrices);

router.route('/:id')
  .put(protect, admin, updateMarketPrice)
  .delete(protect, admin, deleteMarketPrice);

export default router;
