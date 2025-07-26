import React from 'react';

const FloatingActionButtons = ({ setShowChat }) => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
      <button
        className="bg-green-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-green-700 transition"
        title="Open Chat"
        onClick={() => setShowChat(true)}
      >
        <span className="text-2xl">💬</span>
      </button>
      {/* Add more floating buttons here if needed */}
    </div>
  );
};

export default FloatingActionButtons;
