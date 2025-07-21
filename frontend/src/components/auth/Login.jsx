import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import Input from '../common/Input';
import Button from '../common/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setError('');
    setLoading(true);
    
    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === 'complete') {
        // Successful sign in
        navigate('/');
      } else {
        // Handle multi-factor auth if needed
        console.log('Additional auth required:', result);
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (strategy) => {
    if (!isLoaded) return;
    
    signIn.authenticateWithRedirect({
      strategy: `oauth_${strategy}`,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/'
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      {/* Social Login Options */}
      <div className="space-y-3">
        <p className="text-center text-gray-500">Or continue with</p>
        <Button 
          onClick={() => handleOAuthSignIn('google')}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          Google
        </Button>
        <Button 
          onClick={() => handleOAuthSignIn('facebook')}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Facebook
        </Button>
      </div>
      
      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;