import express from 'express';
import { 
  createListing, 
  getListings, 
  getListingById, 
  updateListing, 
  deleteListing,
  getUserListings
} from '../controllers/listingController.js';
import { protect, farmer } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getListings)
  .post(protect, farmer, createListing);

router.route('/user/:id')
  .get(protect, getUserListings);

router.route('/:id')
  .get(getListingById)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

export default router;