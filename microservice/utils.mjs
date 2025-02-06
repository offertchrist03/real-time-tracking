export const generateRandomCoordinate = (
  latitude,
  longitude,
  maxDistance = 50
) => {
  const earthRadius = 6371000; // Rayon de la Terre en mètres
  const delta = maxDistance / earthRadius;

  const theta = Math.random() * 2 * Math.PI; // Angle aléatoire
  const deltaLat = delta * Math.cos(theta);
  const deltaLng =
    (delta * Math.sin(theta)) / Math.cos((latitude * Math.PI) / 180);

  const newLatitude = latitude + (deltaLat * 180) / Math.PI;
  const newLongitude = longitude + (deltaLng * 180) / Math.PI;

  return { latitude: newLatitude, longitude: newLongitude };
};
