import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import listingApi from '../../api/listingApi';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import { ArrowLeft, MessageSquare, Edit, Trash2 } from 'lucide-react';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await listingApi.getListingById(id);
        
        if (!data) {
          throw new Error('Listing not found');
        }
        
        setListing(data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError(err.message || 'Failed to fetch listing details');
        setListing(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    
    try {
      setDeleting(true);
      await listingApi.deleteListing(id, user.token);
      navigate('/listings', { state: { message: 'Listing deleted successfully' } });
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete listing. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/20 text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Button onClick={() => navigate('/listings')} variant="primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/20 text-center">
          <p className="text-white text-lg mb-4">Listing not found</p>
          <Button onClick={() => navigate('/listings')} variant="primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Listings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          onClick={() => navigate('/listings')} 
          variant="ghost"
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Listings
        </Button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 bg-white/5">
            <div className="h-64 md:h-full flex items-center justify-center overflow-hidden">
              {listing.images?.length > 0 ? (
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-slate-400 p-8 text-center">
                  <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg">
                    No image available
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {listing.title}
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full">
                {listing.category}
              </span>
            </div>

            <p className="text-slate-300 mb-6">{listing.description}</p>
            
            <div className="mb-6">
              <span className="text-2xl font-bold text-emerald-400">
                R{listing.price?.toLocaleString()}
              </span>
              <span className="ml-4 text-slate-400">
                per {listing.unit} • {listing.quantity} {listing.unit}s available
              </span>
            </div>

            {/* Seller Info */}
            <div className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <h3 className="font-semibold text-white mb-3">Seller Information</h3>
              <div className="flex items-center">
                <img 
                  src={listing.seller?.profilePicture || '/default-profile.png'} 
                  alt={listing.seller?.firstName || 'Seller'} 
                  className="h-10 w-10 rounded-full object-cover mr-3 border border-white/20"
                />
                <div>
                  <p className="font-medium text-white">
                    {listing.seller?.firstName || 'Unknown'} {listing.seller?.lastName || 'Seller'}
                  </p>
                  <p className="text-sm text-slate-400">
                    {listing.location || 'Location not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link 
                to={`/messages/${listing.seller?._id}`}
                state={{ listingId: listing._id }}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                Contact Seller
              </Link>
              
              {user?._id === listing.seller?._id && (
                <>
                  <Link
                    to={`/listings/edit/${listing._id}`}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <Edit className="w-5 h-5" />
                    Edit
                  </Link>
                  <Button
                    onClick={handleDelete}
                    variant="danger"
                    loading={deleting}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <Trash2 className="w-5 h-5" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;