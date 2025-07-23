import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const turfData = [
  { id:1,name:'Green Valley Turf',lat:23.2599,lng:77.4126},
  { id:2,name:'Stadium Pitch',lat:23.2700,lng:77.4200},
  { id:3,name:'Urban Football Arena',lat:23.2500,lng:77.4300}
];
// dsf
const containerStyle = { width: '100%', height: '400px' };

const Turfs = () => {
  const [userPos, setUserPos] = useState(null);
  const [radiusKm, setRadiusKm] = useState(5);
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => console.warn('Location permission denied')
    );
  }, []);

  const filteredTurfs = useMemo(() => {
    if (!userPos) return turfData;
    const R = 6371;
    return turfData.filter(t => {
      const dLat = (t.lat - userPos.lat) * Math.PI/180;
      const dLng = (t.lng - userPos.lng) * Math.PI/180;
      const a = Math.sin(dLat/2)**2 + Math.cos(userPos.lat*Math.PI/180)*Math.cos(t.lat*Math.PI/180)*Math.sin(dLng/2)**2;
      const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return dist <= radiusKm;
    });
  }, [userPos, radiusKm]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Heafsro */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Turfs</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">Find and book the perfect turf near you.</p>
          </motion.div>
        </div>
      </section>

      {/* Map & Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setRadiusKm(5)} className={`px-4 py-2 rounded ${radiusKm===5?'bg-green-600 text-white':'bg-gray-200'}`}>5 km</button>
            <button onClick={() => setRadiusKm(10)} className={`px-4 py-2 rounded ${radiusKm===10?'bg-green-600 text-white':'bg-gray-200'}`}>10 km</button>
            <button onClick={() => setRadiusKm(20)} className={`px-4 py-2 rounded ${radiusKm===20?'bg-green-600 text-white':'bg-gray-200'}`}>20 km</button>
          </div>
          {userPos && (
            <GoogleMap mapContainerStyle={containerStyle} center={userPos} zoom={13}>
              <Marker position={userPos} label="You" />
              {filteredTurfs.map(t => <Marker key={t.id} position={{lat:t.lat,lng:t.lng}} label={t.name} />)}
            </GoogleMap>
          )}
        </div>
      </section>

      {/* Turf List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
            {filteredTurfs.length ? (
              <ul className="space-y-4">
                {filteredTurfs.map(t => (
                  <motion.li key={t.id} whileHover={{scale:1.02}} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{t.name}</h3>
                    <p className="text-gray-600">Distance: ~{(Math.hypot(t.lat-userPos.lat, t.lng-userPos.lng)*111).toFixed(1)} km</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">No turfs within {radiusKm} km.</p>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Turfs;
