import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
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
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          <Link to={`/listings/${listing._id}`} className="hover:text-green-600">
            {listing.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{listing.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-green-700">
            ${listing.price} per {listing.unit}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(listing.createdAt)}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <span>Quantity: {listing.quantity} {listing.unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;