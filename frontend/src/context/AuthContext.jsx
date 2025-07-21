import { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const logout = () => {
    signOut();
    window.location.href = '/login';
  };

  // Transform Clerk user to match your existing user structure
  const transformedUser = user ? {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.primaryEmailAddress?.emailAddress,
    role: user.publicMetadata?.role || 'buyer',
    token: user.__token // Clerk handles tokens internally
  } : null;

  return (
    <AuthContext.Provider value={{
      user: transformedUser,
      loading: !isLoaded,
      login: () => {}, // Not needed with Clerk
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};