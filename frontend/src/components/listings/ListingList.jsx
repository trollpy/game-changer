import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import listingApi from '../../api/listingApi';
import ListingCard from './ListingCard';
import Spinner from '../common/Spinner';
import Input from '../common/Input';
import { 
  Plus,
  Filter,
  X,
  Search
} from 'lucide-react';

const ListingList = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    sortBy: 'newest'
  });

  const categories = [
    'Fruits',
    'Vegetables',
    'Grains',
    'Livestock',
    'Dairy',
    'Equipment'
  ];

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await listingApi.getListings(filters);
      
      if (response.success) {
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
    const timer = setTimeout(() => {
      fetchListings();
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      sortBy: 'newest'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Marketplace Listings</h1>
        <div className="flex gap-4 w-full md:w-auto">
          <Link
            to="/listings/create"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            <Plus className="w-5 h-5" />
            Create Listing
          </Link>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search listings..."
            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          />
        </div>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Filters</h2>
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="text-slate-400 hover:text-emerald-400 text-sm flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Province or town"
                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Min Price (R)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Minimum"
                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Max Price (R)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Maximum"
                className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-16">
          <Spinner size="lg" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center text-red-400 my-16 p-8 bg-white/10 backdrop-blur-xl rounded-xl">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && listings.length === 0 && !error && (
        <div className="text-center text-slate-400 my-16 p-8 bg-white/10 backdrop-blur-xl rounded-xl">
          No listings available at the moment. Check back later or create a new listing.
        </div>
      )}

      {/* Listings Grid */}
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