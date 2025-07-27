import React from 'react';

const ReferralPanel = () => {
  return (
    <div className="referral-panel bg-white p-4 rounded shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Refer a Friend</h3>
      <p className="text-gray-700 mb-2">Share TurfTime with your friends and earn rewards!</p>
      <input
        type="email"
        placeholder="Friend's email"
        className="w-full px-3 py-2 border border-green-500 focus:border-green-600 active:border-green-600 rounded mb-2"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Send Invite
      </button>
    </div>
  );
};

export default ReferralPanel;
