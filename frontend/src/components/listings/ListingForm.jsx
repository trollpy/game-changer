import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import listingApi from '../../api/listingApi';
import { useAuth } from '../../context/AuthContext';
import { FiUpload, FiMapPin, FiPackage, FiTag, FiEdit2 } from 'react-icons/fi';
import { LoadScript, GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';

const ListingForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // South African provinces
  const PROVINCES = [
    'Eastern Cape',
    'Free State',
    'Gauteng',
    'KwaZulu-Natal',
    'Limpopo',
    'Mpumalanga',
    'North West',
    'Northern Cape',
    'Western Cape'
  ];

  // Common agricultural units in SA
  const UNITS = [
    'kg', 'g', 'ton', 'bag (50kg)', 'bag (80kg)', 
    'crate', 'dozen', 'bunch', 'head', 'pack', 'liter'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'vegetables',
    quantity: '',
    unit: 'kg',
    images: [],
    address: '',
    province: 'Gauteng',
    location: {
      type: 'Point',
      coordinates: [28.0473, -26.2041] // Default to Johannesburg coordinates
    }
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -26.2041,
    lng: 28.0473
  });

  // Initialize Google Maps Autocomplete
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  // Handle place selection
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("No geometry available");
        return;
      }

      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      setFormData({
        ...formData,
        address: place.formatted_address,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        }
      });

      setMapCenter(location);
      if (map) {
        map.panTo(location);
      }
    }
  };

  // Handle image upload to Cloudinary (real implementation)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImageUploading(true);
    try {
      const uploadPromises = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'farmconnect_uploads'); // Your Cloudinary preset
        
        return fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => data.secure_url);
      });

      const newImages = await Promise.all(uploadPromises);
      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });
    } catch (err) {
      console.error('Image upload failed', err);
      setError('Failed to upload images');
    } finally {
      setImageUploading(false);
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isEdit) {
        await listingApi.updateListing(id, formData, user?.token);
      } else {
        await listingApi.createListing(formData, user?.token);
      }
      navigate('/listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      libraries={['places']}
    >
      <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            {isEdit ? 'Update Your Listing' : 'Create New Listing'}
          </h2>
          <p className="text-gray-600">
            {isEdit ? 'Make changes to your product' : 'Sell your farm products to the community'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Information Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
              <FiTag className="mr-2" /> Product Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Product Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Fresh Organic Tomatoes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="livestock">Livestock</option>
                  <option value="dairy">Dairy</option>
                  <option value="poultry">Poultry</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 mb-2 font-medium">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your product in detail..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Pricing & Quantity Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
              <FiPackage className="mr-2" /> Pricing & Quantity
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Price (ZAR)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">R</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Quantity*</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="10"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Unit*</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    {UNITS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
              <FiMapPin className="mr-2" /> Location
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Province*</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={(e) => setFormData({...formData, province: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  {PROVINCES.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Address*</label>
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your farm or market address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </Autocomplete>
              </div>
            </div>

            <div className="mt-4 h-64 rounded-lg overflow-hidden">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={12}
                onLoad={map => setMap(map)}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
              <FiUpload className="mr-2" /> Product Images
            </h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Upload Images {formData.images.length > 0 && `(${formData.images.length}/5)`}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB each)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageUpload}
                    disabled={imageUploading || formData.images.length >= 5}
                    className="hidden"
                  />
                </label>
              </div>
              {imageUploading && (
                <p className="text-sm text-green-600 mt-2">Uploading images...</p>
              )}
              {formData.images.length >= 5 && (
                <p className="text-sm text-gray-500 mt-2">Maximum 5 images reached</p>
              )}
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({...formData, images: newImages});
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isEdit ? (
                    <>
                      <FiEdit2 className="mr-2" /> Update Listing
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </LoadScript>
  );
};

export default ListingForm;