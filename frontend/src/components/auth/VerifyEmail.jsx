import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    setError('');
    setLoading(true);
    
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });
      
      if (completeSignUp.status === 'complete') {
        navigate('/');
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
      <p className="mb-4">Check your email for a verification code</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleVerify}>
        <Input
          label="Verification Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? 'Verifying...' : 'Verify Email'}
        </Button>
      </form>
    </div>
  );
};

export default VerifyEmail;