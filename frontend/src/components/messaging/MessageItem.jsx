import { formatDate } from '../../utils/dateFormatter';

const MessageItem = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
          isCurrentUser 
            ? 'bg-green-500 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-green-100' : 'text-gray-500'}`}>
          {formatDate(message.createdAt, 'HH:mm')}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;