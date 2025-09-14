import React from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

// ✅ TurfCard Component
export function TurfCard({ turf, distance }) {
  const navigate = useNavigate();

  const handleGetDirections = () => {
    navigate('/test', { state: { turf } }); // navigate with turf data
  };

  return (
    <Card className="p-4 rounded-xl shadow-md">
      {turf.photo && (
        <img
          src={turf.photo}
          alt={turf.name + ' photo'}
          className="w-full h-40 object-cover rounded-t-xl mb-2"
        />
      )}
      <div className="font-bold text-lg">{turf.name}</div>
      {distance ? (
        <div className="text-green-800">
          <span>{distance.distanceText} ({distance.durationText} drive)</span>
        </div>
      ) : (
        <div className="text-gray-500">Distance N/A</div>
      )}
      <Button className="mt-2" onClick={handleGetDirections}>
        Get Directions
      </Button>
    </Card>
  );
}

// ✅ Test Page Component (Testdirection)
export function Testdirection() {
  const location = useLocation();
  const turf = location.state?.turf;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Directions to Turf</h1>
      {turf ? (
        <div>
          <h2 className="text-xl font-semibold">{turf.name}</h2>
          <p>{turf.address}</p>
          {turf.photo && (
            <img
              src={turf.photo}
              alt={turf.name}
              className="w-full max-w-md mt-4 rounded-xl"
            />
          )}
        </div>
      ) : (
        <p>No turf data found.</p>
      )}
    </div>
  );
}
