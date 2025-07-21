import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../api/authApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const EditProfilePage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    farmSize: '',
    crops: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await authApi.getProfile(user.token);
        setFormData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          password: '',
          farmSize: profile.farmSize || '',
          crops: profile.crops?.join(', ') || '',
          location: profile.location?.coordinates?.join(', ') || ''
        });
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        ...(formData.password && { password: formData.password }),
        ...(user.role === 'farmer' && {
          farmSize: formData.farmSize,
          crops: formData.crops.split(',').map(crop => crop.trim())
        }),
        location: {
          type: 'Point',
          coordinates: formData.location.split(',').map(coord => parseFloat(coord.trim()))
        }
      };

      const updatedUser = await authApi.updateProfile(updatedData, user.token);
      login(updatedUser);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.firstName) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password (leave blank to keep current)"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
          />
          {user.role === 'farmer' && (
            <>
              <Input
                label="Farm Size (acres)"
                type="number"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                min="0"
              />
              <Input
                label="Crops (comma separated)"
                type="text"
                name="crops"
                value={formData.crops}
                onChange={handleChange}
              />
            </>
          )}
          <Input
            label="Location (longitude, latitude)"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. -1.2345, 36.7890"
          />
          <div className="flex justify-end mt-6 space-x-4">
            <Button
              type="button"
              onClick={() => navigate('/profile')}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;