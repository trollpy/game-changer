export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateLocation = (location) => {
  if (!location || !location.coordinates || location.coordinates.length !== 2) {
    return false;
  }
  const [lng, lat] = location.coordinates;
  return (
    typeof lng === 'number' && 
    typeof lat === 'number' &&
    lng >= -180 && lng <= 180 &&
    lat >= -90 && lat <= 90
  );
};

export const validateListing = (listing) => {
  if (!listing.title || listing.title.length < 3) {
    return 'Title must be at least 3 characters';
  }
  if (!listing.description || listing.description.length < 10) {
    return 'Description must be at least 10 characters';
  }
  if (!listing.price || isNaN(listing.price) || listing.price <= 0) {
    return 'Price must be a positive number';
  }
  if (!listing.quantity || isNaN(listing.quantity) || listing.quantity <= 0) {
    return 'Quantity must be a positive number';
  }
  if (!validateLocation(listing.location)) {
    return 'Invalid location coordinates';
  }
  return null;
};