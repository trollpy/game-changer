import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <SignedOut>
        <Navigate to="/login" state={{ from: location }} replace />
      </SignedOut>
      <SignedIn>
        {user && roles && !roles.includes(user.role) ? (
          <Navigate to="/" replace />
        ) : (
          <Outlet /> // ✅ This renders the actual route content like <ProfilePage />
        )}
      </SignedIn>
    </>
  );
};

export default ProtectedRoute;
