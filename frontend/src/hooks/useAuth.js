import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useRequireAuth = (redirectUrl = '/login') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectUrl, { state: { from: window.location.pathname } });
    }
  }, [user, loading, navigate, redirectUrl]);

  return { user, loading };
};

export const useRequireRole = (roles, redirectUrl = '/') => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user && !roles.includes(user.role)) {
      navigate(redirectUrl);
    }
  }, [user, loading, roles, navigate, redirectUrl]);

  return { user, loading };
};