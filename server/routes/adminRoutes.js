import express from 'express';
import { 
  getReports, 
  getReportById, 
  resolveReport, 
  dismissReport,
  getDashboardStats
} from '../controllers/adminController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);

router.route('/reports')
  .get(protect, admin, getReports);

router.route('/reports/:id')
  .get(protect, admin, getReportById);

router.put('/reports/:id/resolve', protect, admin, resolveReport);
router.put('/reports/:id/dismiss', protect, admin, dismissReport);

export default router;