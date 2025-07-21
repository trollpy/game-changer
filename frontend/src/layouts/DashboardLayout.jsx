import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-primary-600 text-white p-6 flex flex-col">
        <div className="mb-8 text-2xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
          Agri-Link Dashboard
        </div>
        <Link className="mb-4 hover:underline" to="/listings">Marketplace</Link>
        <Link className="mb-4 hover:underline" to="/market">Market Prices</Link>
        <Link className="mb-4 hover:underline" to="/messages">Messages</Link>
        <Link className="mb-4 hover:underline" to="/profile">Profile</Link>
        {user?.roles?.includes('admin') && (
          <Link className="mb-4 hover:underline" to="/admin">Admin Panel</Link>
        )}
        <button onClick={handleLogout} className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
