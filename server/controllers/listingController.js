import asyncHandler from 'express-async-handler';
import Listing from '../models/Listing.js';

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private/Farmer
const createListing = asyncHandler(async (req, res) => {
  const { title, description, price, category, quantity, unit, images, location } = req.body;

  const listing = new Listing({
    title,
    description,
    price,
    category,
    quantity,
    unit,
    images,
    location,
    seller: req.user._id
  });

  const createdListing = await listing.save();
  res.status(201).json(createdListing);
});

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, location, radius = 50 } = req.query;
  const query = { isActive: true };

  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let listings;
  if (location) {
    const [lng, lat] = location.split(',').map(Number);
    listings = await Listing.find({
      ...query,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).populate('seller', 'firstName lastName email');
  } else {
    listings = await Listing.find(query).populate('seller', 'firstName lastName email');
  }

  res.json(listings);
});

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('seller', 'firstName lastName email');

  if (listing) {
    res.json(listing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private/Farmer
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this listing');
    }

    listing.title = req.body.title || listing.title;
    listing.description = req.body.description || listing.description;
    listing.price = req.body.price || listing.price;
    listing.category = req.body.category || listing.category;
    listing.quantity = req.body.quantity || listing.quantity;
    listing.unit = req.body.unit || listing.unit;
    listing.images = req.body.images || listing.images;
    listing.location = req.body.location || listing.location;
    listing.isActive = req.body.isActive !== undefined ? req.body.isActive : listing.isActive;

    const updatedListing = await listing.save();
    res.json(updatedListing);
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private/Farmer or Admin
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    if (listing.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to delete this listing');
    }

    await listing.remove();
    res.json({ message: 'Listing removed' });
  } else {
    res.status(404);
    throw new Error('Listing not found');
  }
});

// @desc    Get user listings
// @route   GET /api/listings/user/:id
// @access  Private
const getUserListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ seller: req.params.id });
  res.json(listings);
});

export { 
  createListing, 
  getListings, 
  getListingById, 
  updateListing, 
  deleteListing,
  getUserListings
};