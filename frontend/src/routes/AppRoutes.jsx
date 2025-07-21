import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Import all your pages and components
import Home from '../pages/Home';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ListingsPage from '../pages/Listings/ListingsPage';
import ListingDetailsPage from '../pages/Listings/ListingDetailsPage';
import ListingForm from '../components/listings/ListingForm';
import MarketPricesPage from '../pages/Market/MarketPricesPage';
import MessagingPage from '../pages/Messaging/MessagingPage';
import ChatBox from '../components/messaging/ChatBox';
import ProfilePage from '../pages/Profile/ProfilePage';
import EditProfilePage from '../pages/Profile/EditProfilePage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AdminDashboardPage from '../pages/Admin/AdminDashboardPage';
import ReportsPage from '../pages/Admin/ReportsPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/unauthorized" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route element={<MainLayout><Outlet /></MainLayout>}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="listings" element={<ListingsPage />} />
        <Route path="listings/:id" element={<ListingDetailsPage />} />
        <Route path="market" element={<MarketPricesPage />} />
      </Route>

      {/* Protected user dashboard routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout><Outlet /></DashboardLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/edit" element={<EditProfilePage />} />
        <Route path="listings/create" element={<ListingForm />} />
        <Route path="listings/edit/:id" element={<ListingForm isEdit />} />
        <Route path="messages" element={<MessagingPage />}>
          <Route index element={<div className="flex items-center justify-center h-full text-gray-500">Select a conversation</div>} />
          <Route path=":userId" element={<ChatBox />} />
        </Route>
      </Route>

      {/* Protected admin routes */}
      <Route
        path="admin"
        element={
          <AdminRoute>
            <AdminLayout><Outlet /></AdminLayout>
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* Fallback routes */}
      <Route path="/unauthorized" element={<div className="flex items-center justify-center h-screen">Unauthorized access</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;