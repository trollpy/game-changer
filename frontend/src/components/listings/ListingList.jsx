import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingApi from '../../api/listingApi';
import ListingCard from './ListingCard';
import Spinner from '../common/Spinner';
import Input from '../common/Input';

const ListingList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    location: ''
  });

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await listingApi.getListings(filters);
      
      console.log('Listings API response:', response);

      if (response.success) {
        // Ensure data is always an array, even if empty or undefined
        const listingsData = Array.isArray(response.data) ? response.data : [];
        setListings(listingsData);
        
        if (listingsData.length === 0) {
          setError('No listings found matching your criteria');
        }
      } else {
        throw new Error(response.error || 'Failed to fetch listings');
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err.message || 'Failed to fetch listings. Please try again later.');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Marketplace Listings</h1>
        <Link
          to="/listings/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Create Listing
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* ... your existing filter inputs ... */}
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-red-500 my-10">{error}</div>
      )}

      {/* Listings */}
      {!loading && listings.length === 0 && !error && (
        <div className="text-center text-gray-500 my-10">
          No listings available at the moment.
        </div>
      )}

      {!loading && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingList;