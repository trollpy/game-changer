import asyncHandler from 'express-async-handler';
import MarketPrice from '../models/MarketPrice.js';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
import logger from '../utils/logger.js';

// Validation schemas
const priceSchema = Joi.object({
  commodity: Joi.string().trim().required(),
  price: Joi.number().positive().required(),
  unit: Joi.string().trim().default('USD/ton'),
  market: Joi.string().trim().required(),
  region: Joi.string().trim().required(),
  source: Joi.string().trim().default('user'),
  date: Joi.date().default(Date.now)
});

// GET /api/market-prices
const getMarketPrices = asyncHandler(async (req, res) => {
  const { commodity, market, region, startDate, endDate, page = 1, limit = 100 } = req.query;
  
  // Build query
  const query = {};
  if (commodity) query.commodity = { $regex: commodity, $options: 'i' };
  if (market) query.market = { $regex: market, $options: 'i' };
  if (region) query.region = { $regex: region, $options: 'i' };
  
  // Date range filter
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  // Execute query with pagination
  const prices = await MarketPrice.find(query)
    .sort({ date: -1 })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .lean(); // For better performance

  // Add pagination metadata
  const total = await MarketPrice.countDocuments(query);
  res.json({
    success: true,
    data: prices,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  });
});

// GET /api/market-prices/latest
const getLatestMarketPrices = asyncHandler(async (req, res) => {
  const { limit = 20, commodities } = req.query;
  
  // If specific commodities requested
  const matchStage = {};
  if (commodities) {
    const commodityList = commodities.split(',').map(c => c.trim());
    matchStage.commodity = { $in: commodityList };
  }

  const latestPrices = await MarketPrice.aggregate([
    { $match: matchStage },
    { $sort: { date: -1 } },
    { 
      $group: {
        _id: "$commodity",
        document: { $first: "$$ROOT" }
      }
    },
    { $replaceRoot: { newRoot: "$document" } },
    { $limit: parseInt(limit) },
    { $project: { __v: 0 } } // Exclude version key
  ]);

  res.json({
    success: true,
    count: latestPrices.length,
    data: latestPrices
  });
});

// POST /api/market-prices
const addMarketPrice = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = priceSchema.validate(req.body);
  if (error) {
    logger.warn('Validation error', { error: error.details });
    return res.status(400).json({ 
      success: false,
      error: error.details.map(e => e.message).join(', ')
    });
  }

  // Check for duplicate entry
  const existing = await MarketPrice.findOne({
    commodity: value.commodity,
    market: value.market,
    date: value.date
  });

  if (existing) {
    return res.status(409).json({
      success: false,
      error: 'Duplicate entry for this commodity, market, and date'
    });
  }

  const marketPrice = new MarketPrice(value);
  const createdPrice = await marketPrice.save();
  
  logger.info(`New price added for ${value.commodity} at ${value.market}`);
  
  res.status(201).json({
    success: true,
    data: createdPrice
  });
});

// PUT /api/market-prices/:id
const updateMarketPrice = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid ID format' 
    });
  }

  const { error, value } = priceSchema.validate(req.body, {
    stripUnknown: true
  });

  if (error) {
    return res.status(400).json({ 
      success: false,
      error: error.details.map(e => e.message).join(', ')
    });
  }

  const updatedPrice = await MarketPrice.findByIdAndUpdate(
    req.params.id,
    value,
    { new: true, runValidators: true }
  );

  if (!updatedPrice) {
    return res.status(404).json({ 
      success: false,
      error: 'Market price not found' 
    });
  }

  logger.info(`Price updated: ${req.params.id}`);
  res.json({
    success: true,
    data: updatedPrice
  });
});

// DELETE /api/market-prices/:id
const deleteMarketPrice = asyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ 
      success: false, 
      error: 'Invalid ID format' 
    });
  }

  const deletedPrice = await MarketPrice.findByIdAndDelete(req.params.id);

  if (!deletedPrice) {
    return res.status(404).json({ 
      success: false,
      error: 'Market price not found' 
    });
  }

  logger.info(`Price deleted: ${req.params.id}`);
  res.json({
    success: true,
    data: { id: req.params.id }
  });
});

export { 
  getMarketPrices, 
  getLatestMarketPrices, 
  addMarketPrice, 
  updateMarketPrice, 
  deleteMarketPrice 
};