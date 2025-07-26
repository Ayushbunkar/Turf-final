import React from 'react';

const ChatWidget = ({ showChat, setShowChat }) => {
  if (!showChat) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">Live Chat</h4>
        <button onClick={() => setShowChat(false)} className="text-gray-500 hover:text-red-500">✕</button>
      </div>
      <div className="h-48 overflow-y-auto border rounded mb-2 p-2 bg-gray-50">
        {/* Chat messages would go here */}
        <div className="text-gray-400 text-sm">No messages yet.</div>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Send
      </button>
    </div>
  );
};

export default ChatWidget;
