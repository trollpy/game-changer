import { useState } from 'react';
import messagingApi from '../../api/messagingApi';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const MessageInput = ({ receiverId, onNewMessage }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError('');

    try {
      const newMessage = await messagingApi.sendMessage(
        {
          receiver: receiverId,
          content: message
        },
        user.token
      );
      onNewMessage(newMessage);
      setMessage('');
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        disabled={loading}
      />
      <Button type="submit" disabled={loading || !message.trim()}>
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default MessageInput;