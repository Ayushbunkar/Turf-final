import React from 'react';

const NotificationPanel = ({ showNotifications, setShowNotifications, notifications }) => {
  if (!showNotifications) return null;
  return (
    <div className="fixed top-8 right-8 z-50 w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-lg">Notifications</h4>
        <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-red-500">✕</button>
      </div>
      <div className="h-64 overflow-y-auto border rounded mb-2 p-2 bg-gray-50">
        {notifications.length === 0 ? (
          <div className="text-gray-400 text-sm">No notifications yet.</div>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className={`mb-2 p-2 rounded ${note.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
              <div className="font-medium">{note.message}</div>
              <div className="text-xs text-gray-500">{note.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
