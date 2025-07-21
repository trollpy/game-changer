import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';
import Listing from '../models/Listing.js';
import User from '../models/User.js';

// @desc    Get all reports
// @route   GET /api/admin/reports
// @access  Private/Admin
const getReports = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const query = {};

  if (status) query.status = status;

  const reports = await Report.find(query)
    .populate('reporter', 'firstName lastName email')
    .sort({ createdAt: -1 });

  res.json(reports);
});

// @desc    Get report by ID
// @route   GET /api/admin/reports/:id
// @access  Private/Admin
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate('reporter', 'firstName lastName email')
    .populate('resolvedBy', 'firstName lastName');

  if (report) {
    res.json(report);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc    Resolve report
// @route   PUT /api/admin/reports/:id/resolve
// @access  Private/Admin
const resolveReport = asyncHandler(async (req, res) => {
  const { actionTaken } = req.body;
  const report = await Report.findById(req.params.id);

  if (report) {
    report.status = 'resolved';
    report.resolvedAt = new Date();
    report.resolvedBy = req.user._id;
    report.actionTaken = actionTaken;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc    Dismiss report
// @route   PUT /api/admin/reports/:id/dismiss
// @access  Private/Admin
const dismissReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    report.status = 'dismissed';
    report.resolvedAt = new Date();
    report.resolvedBy = req.user._id;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } else {
    res.status(404);
    throw new Error('Report not found');
  }
});

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const [usersCount, farmersCount, buyersCount, listingsCount, activeListingsCount, reportsCount, pendingReportsCount] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'farmer' }),
    User.countDocuments({ role: 'buyer' }),
    Listing.countDocuments(),
    Listing.countDocuments({ isActive: true }),
    Report.countDocuments(),
    Report.countDocuments({ status: 'pending' })
  ]);

  res.json({
    usersCount,
    farmersCount,
    buyersCount,
    listingsCount,
    activeListingsCount,
    reportsCount,
    pendingReportsCount
  });
});

export { 
  getReports, 
  getReportById, 
  resolveReport, 
  dismissReport,
  getDashboardStats 
};