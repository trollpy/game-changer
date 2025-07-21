import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import messagingApi from '../../api/messagingApi';
import Spinner from '../../components/common/Spinner';

const MessagingPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await messagingApi.getConversations(user.token);
        setConversations(data.conversations || []);
      } catch (err) {
        setError('Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [user.token]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex h-[600px]">
          <div className="md:w-1/3 border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No conversations yet
                </div>
              ) : (
                <ul>
                  {conversations.map((conv) => (
                    <li key={conv.userId} className="border-b">
                      <Link
                        to={`/messages/${conv.userId}`}
                        className="block p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <img
                            src={conv.profilePicture || '/default-profile.png'}
                            alt={conv.firstName}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">
                                {conv.firstName} {conv.lastName}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">
                              {conv.lastMessage.content}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="bg-green-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="md:w-2/3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
