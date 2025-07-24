import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import messagingApi from '../../api/messagingApi';
import Spinner from '../../components/common/Spinner';
import { 
  MessageCircle, 
  User, 
  Search, 
  Plus,
  Clock,
  Check,
  CheckCheck,
  MoreVertical
} from 'lucide-react';

const MessagingPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await messagingApi.getConversations(user?.token);
        setConversations(data.conversations || []);
      } catch (err) {
        setError('Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.token) {
      fetchConversations();
    }
  }, [user?.token]);

  const filteredConversations = conversations.filter(conv =>
    `${conv.firstName} ${conv.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            Messages
          </h1>
          <p className="text-slate-400">Connect with farmers, buyers, and partners</p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex h-[700px]">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-white/10 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Conversations</h2>
                  <button className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl text-emerald-400 transition-colors duration-300">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">No conversations yet</h3>
                    <p className="text-slate-400 text-sm">Start connecting with other users</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredConversations.map((conv) => (
                      <Link
                        key={conv.userId}
                        to={`/messages/${conv.userId}`}
                        className="block p-4 mb-2 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          {/* Profile Picture */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                              {conv.profilePicture ? (
                                <img
                                  src={conv.profilePicture}
                                  alt={conv.firstName}
                                  className="w-full h-full rounded-2xl object-cover"
                                />
                              ) : (
                                <User className="w-6 h-6 text-white" />
                              )}
                            </div>
                            {/* Online Status */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                          </div>

                          {/* Message Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                                {conv.firstName} {conv.lastName}
                              </h3>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatMessageTime(conv.lastMessage?.createdAt)}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-slate-400 truncate mr-2">
                                {conv.lastMessage?.senderId === user?.id && (
                                  <span className="mr-1">
                                    {conv.lastMessage?.read ? (
                                      <CheckCheck className="w-3 h-3 inline text-emerald-400" />
                                    ) : (
                                      <Check className="w-3 h-3 inline text-slate-400" />
                                    )}
                                  </span>
                                )}
                                {conv.lastMessage?.content || 'No messages yet'}
                              </p>
                              
                              {/* Unread Badge */}
                              {conv.unreadCount > 0 && (
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full font-semibold animate-pulse">
                                  {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-800/20">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;