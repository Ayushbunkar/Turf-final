// Example enhancement for TurfCard.jsx
export default function TurfCard({
  turf,
  distance,
  getDirections,
  ...otherProps
}) {
  // ...existing code...

  return (
    <Card>
      {turf.photo && (
        <img
          src={turf.photo}
          alt={turf.name + " photo"}
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
      <Button
        className="mt-2"
        onClick={() => getDirections(turf)}
      >
        Get Directions
      </Button>
      {/* ...rest of your card */}
    </Card>
  );
}
