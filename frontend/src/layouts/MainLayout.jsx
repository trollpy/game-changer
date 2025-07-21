import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, removeNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="w-full px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-green-600 dark:text-green-400">
              Agri-Link
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile" 
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Profile
                  </Link>
                  {user.role === 'farmer' && (
                    <Link 
                      to="/listings/create" 
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                    >
                      Sell
                    </Link>
                  )}
                  <Link 
                    to="/messages" 
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Messages
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Notification container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              notification.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="w-full bg-white dark:bg-gray-800 shadow-sm mt-8">
        <div className="w-full px-4 py-6 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Agri-Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;