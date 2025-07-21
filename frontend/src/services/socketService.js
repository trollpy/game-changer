import { useSocket } from '../hooks/useSocket';

export const initializeSocket = (user) => {
  const socketUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
  const { sendMessage } = useSocket(socketUrl);

  const joinConversation = (conversationId) => {
    sendMessage({
      type: 'join',
      conversationId,
      userId: user._id
    });
  };

  const sendChatMessage = (messageData) => {
    sendMessage({
      type: 'message',
      ...messageData
    });
  };

  return {
    joinConversation,
    sendChatMessage
  };
};