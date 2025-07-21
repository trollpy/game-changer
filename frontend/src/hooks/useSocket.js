import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const useSocket = (url, options = {}) => {
  const socketRef = useRef(null);
  const { user } = useAuth();
  const { addNotification } = useNotification();

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection
    socketRef.current = new WebSocket(url);

    // Handle incoming messages
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'notification') {
        addNotification(message.text, 'info');
      }
    };

    // Handle connection open
    socketRef.current.onopen = () => {
      // Authenticate with the server
      socketRef.current.send(JSON.stringify({
        type: 'auth',
        token: user.token
      }));
    };

    // Handle errors
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user, url, addNotification]);

  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};