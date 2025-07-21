import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../api/authApi';
import Spinner from '../../components/common/Spinner';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await authApi.getProfile(user.token);
        setProfile(data);
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.token]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 border-r">
            <div className="flex flex-col items-center">
              <img
                src={profile.profilePicture || '/default-profile.png'}
                alt={profile.firstName}
                className="h-32 w-32 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{profile.email}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                profile.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800' 
                  : profile.role === 'farmer'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {profile.role}
              </span>
              <Link
                to="/profile/edit"
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700">First Name</h4>
                <p className="mt-1">{profile.firstName}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Last Name</h4>
                <p className="mt-1">{profile.lastName}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Email</h4>
                <p className="mt-1">{profile.email}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Account Status</h4>
                <p className="mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    profile.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {profile.isVerified ? 'Verified' : 'Pending Verification'}
                  </span>
                </p>
              </div>
              {profile.role === 'farmer' && (
                <>
                  <div>
                    <h4 className="font-medium text-gray-700">Farm Size</h4>
                    <p className="mt-1">{profile.farmSize} acres</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Crops</h4>
                    <p className="mt-1">
                      {profile.crops?.join(', ') || 'Not specified'}
                    </p>
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700">Location</h4>
                <p className="mt-1">
                  {profile.location?.coordinates?.join(', ') || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;