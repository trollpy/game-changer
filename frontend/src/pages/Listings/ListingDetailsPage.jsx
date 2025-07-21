import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import listingApi from '../../api/listingApi';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const data = await listingApi.getListingById(id);
        setListing(data);
      } catch (err) {
        setError('Failed to fetch listing details');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingApi.deleteListing(id, user.token);
        navigate('/listings');
      } catch (err) {
        setError('Failed to delete listing');
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!listing) {
    return <div className="text-center mt-10">Listing not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="h-64 md:h-full bg-gray-200 overflow-hidden">
              {listing.images?.length > 0 ? (
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {listing.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{listing.description}</p>
            
            <div className="mb-4">
              <span className="text-xl font-bold text-green-700">
                ${listing.price} per {listing.unit}
              </span>
              <span className="ml-4 text-gray-500">
                Quantity: {listing.quantity} {listing.unit}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center">
                <img 
                  src={listing.seller.profilePicture || '/default-profile.png'} 
                  alt={listing.seller.firstName} 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">
                    {listing.seller.firstName} {listing.seller.lastName}
                  </p>
                  <p className="text-sm text-gray-500">{listing.seller.email}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link 
                to={`/messages/${listing.seller._id}`}
                state={{ listingId: listing._id }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Contact Seller
              </Link>
              
              {user?._id === listing.seller._id && (
                <>
                  <Link
                    to={`/listings/edit/${listing._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit Listing
                  </Link>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Listing
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