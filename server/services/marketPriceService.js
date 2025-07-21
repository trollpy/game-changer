import axios from 'axios';
import MarketPrice from '../models/MarketPrice.js';
import { scheduleJob } from 'node-schedule';
import logger from '../utils/logger.js';

// Config
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const MARKET_DATA_API = process.env.MARKET_DATA_API;
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT) || 10000;

const axiosConfig = {
  baseURL: MARKET_DATA_API,
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  },
  timeout: API_TIMEOUT,
};

// Create a reusable Axios instance
const apiClient = axios.create(axiosConfig);

// Cache layer (optional, improves performance)
const priceCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches latest market prices from RapidAPI
 * @returns {Promise<Array>} Latest market prices
 */
export const fetchLatestMarketPrices = async () => {
  const cacheKey = 'latest-prices';
  
  // Return cached data if available
  if (priceCache.has(cacheKey)) {
    const cached = priceCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      logger.debug('Returning cached market prices');
      return cached.data;
    }
  }

  try {
    logger.info('Fetching latest market prices from RapidAPI');
    const response = await apiClient.get('/latest');
    const prices = response.data;

    // Validate and normalize data
    const validatedPrices = prices.map(price => ({
      commodity: price.commodity?.trim(),
      market: price.market?.trim(),
      date: new Date(price.date),
      price: parseFloat(price.price),
      unit: price.unit || 'USD/ton',
      source: 'RapidAPI-AgriBase',
    }));

    // Update database
    await updatePricesInDatabase(validatedPrices);

    // Update cache
    priceCache.set(cacheKey, {
      data: validatedPrices,
      timestamp: Date.now(),
    });

    return validatedPrices;
  } catch (error) {
    logger.error('Failed to fetch latest prices', {
      error: error.message,
      endpoint: `${MARKET_DATA_API}/latest`,
    });
    throw new Error('Market data service unavailable');
  }
};

/**
 * Updates prices in MongoDB (with transactions)
 * @param {Array} prices - Array of price objects
 */
const updatePricesInDatabase = async (prices) => {
  const session = await MarketPrice.startSession();
  session.startTransaction();

  try {
    await Promise.all(
      prices.map(price =>
        MarketPrice.findOneAndUpdate(
          { commodity: price.commodity, market: price.market, date: price.date },
          { $set: price },
          { upsert: true, new: true, session }
        )
      )
    );
    await session.commitTransaction();
  } catch (dbError) {
    await session.abortTransaction();
    logger.error('Database update failed', { error: dbError.message });
    throw dbError;
  } finally {
    session.endSession();
  }
};

/**
 * Scheduled job to refresh prices every 15 minutes
 */
export const startScheduledUpdates = () => {
  scheduleJob('*/15 * * * *', async () => {
    try {
      await fetchLatestMarketPrices();
      logger.info('Scheduled price update completed');
    } catch (error) {
      logger.error('Scheduled update failed', error);
    }
  });
};

// Start scheduled jobs when module loads
startScheduledUpdates();