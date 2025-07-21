import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRequireRole } from '../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  useRequireRole(['admin'], '/');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/admin" className="text-xl font-bold text-green-600">
              Agri-Link Admin
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/users" 
                className="text-gray-700 hover:text-green-600"
              >
                Users
              </Link>
              <Link 
                to="/admin/reports" 
                className="text-gray-700 hover:text-green-600"
              >
                Reports
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white shadow-sm mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Agri-Link Admin</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;