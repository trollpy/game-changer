import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import messagingApi from '../../api/messagingApi';
import { useAuth } from '../../context/AuthContext';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import Spinner from '../common/Spinner';

const ChatBox = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await messagingApi.getMessages(userId, user.token);
        setMessages(data);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [userId, user.token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 bg-gray-50">
        <h2 className="text-lg font-semibold">Chat with User</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageItem 
            key={message._id} 
            message={message} 
            isCurrentUser={message.sender === user._id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 bg-gray-50">
        <MessageInput 
          receiverId={userId} 
          onNewMessage={handleNewMessage} 
        />
      </div>
    </div>
  );
};

export default ChatBox;