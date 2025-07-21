export const formatUserResponse = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    location: user.location,
    farmSize: user.farmSize,
    crops: user.crops,
    profilePicture: user.profilePicture,
    isVerified: user.isVerified,
    createdAt: user.createdAt
  };
};

export const formatListingResponse = (listing) => {
  return {
    id: listing._id,
    title: listing.title,
    description: listing.description,
    price: listing.price,
    category: listing.category,
    quantity: listing.quantity,
    unit: listing.unit,
    images: listing.images,
    location: listing.location,
    seller: listing.seller,
    isActive: listing.isActive,
    createdAt: listing.createdAt
  };
};

export const formatMarketPriceResponse = (price) => {
  return {
    id: price._id,
    commodity: price.commodity,
    price: price.price,
    unit: price.unit,
    market: price.market,
    region: price.region,
    date: price.date,
    source: price.source
  };
};