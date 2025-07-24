import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../api/authApi';
import Spinner from '../../components/common/Spinner';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  MapPin, 
  Edit3, 
  CheckCircle, 
  Clock, 
  Leaf,
  BarChart3
} from 'lucide-react';

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-slate-400 text-center">
          <p className="text-lg font-semibold">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              {/* Profile Picture */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt={profile.firstName}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-900">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {profile.firstName || ''} {profile.lastName || ''}
              </h2>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-slate-400" />
                <p className="text-slate-400">{profile.email || 'No email'}</p>
              </div>

              {/* Role Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                  profile.role === 'admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : profile.role === 'farmer'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {profile.role === 'farmer' && <Leaf className="w-4 h-4" />}
                  {profile.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'User'}
                </span>
              </div>

              {/* Verification Status */}
              <div className="mb-6">
                <div className={`flex items-center justify-center gap-2 p-3 rounded-xl ${
                  profile.isVerified 
                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                    : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
                }`}>
                  {profile.isVerified ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {profile.isVerified ? 'Verified Account' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <Link
                to="/profile/edit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">First Name</h4>
                  <p className="text-white font-semibold text-lg">{profile.firstName || 'Not specified'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Last Name</h4>
                  <p className="text-white font-semibold text-lg">{profile.lastName || 'Not specified'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Email Address</h4>
                  <p className="text-white font-semibold text-lg">{profile.email || 'Not specified'}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Account Status</h4>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
                    profile.isVerified 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {profile.isVerified ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    {profile.isVerified ? 'Verified' : 'Pending Verification'}
                  </div>
                </div>
              </div>
            </div>

            {/* Farmer-specific Information */}
            {profile.role === 'farmer' && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                  </div>
                  Farming Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Farm Size</h4>
                    <p className="text-white font-semibold text-lg">
                      {profile.farmSize ? `${profile.farmSize} acres` : 'Not specified'}
                    </p>
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.crops && profile.crops.length > 0 ? (
                        profile.crops.map((crop, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium border border-emerald-500/30"
                          >
                            {crop}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">Not specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location Information */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                Location Information
              </h3>
              
              <div className="space-y-2">
                <h4 className="font-medium text-slate-400 text-sm uppercase tracking-wide">Coordinates</h4>
                <p className="text-white font-semibold text-lg">
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