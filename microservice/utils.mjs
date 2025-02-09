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

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

export function generateNextCoordinate(
  prevCoord,
  currentCoord,
  stepRange = 50
) {
  const earthRadius = 6371000; // Rayon de la Terre en mètres
  const maxDistance = stepRange; // Distance maximale du pas

  function haversineBearing(coord1, coord2) {
    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);
    const dLon = lon2 - lon1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    return Math.atan2(y, x);
  }

  const initialBearing = haversineBearing(prevCoord, currentCoord);

  // Ajout d'une courbure progressive
  const angleVariation = (Math.random() - 0.5) * (Math.PI / 4); // Déviation aléatoire max ±45°
  const curvedBearing = initialBearing + angleVariation;

  // Distance avec une légère variation aléatoire
  const randomDistance = maxDistance * (0.75 + Math.random() * 0.5);

  const lat1 = toRadians(currentCoord.latitude);
  const lon1 = toRadians(currentCoord.longitude);

  const newLat = Math.asin(
    Math.sin(lat1) * Math.cos(randomDistance / earthRadius) +
      Math.cos(lat1) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(curvedBearing)
  );

  const newLon =
    lon1 +
    Math.atan2(
      Math.sin(curvedBearing) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(lat1),
      Math.cos(randomDistance / earthRadius) - Math.sin(lat1) * Math.sin(newLat)
    );

  return { latitude: toDegrees(newLat), longitude: toDegrees(newLon) };
}

// Example usage:
// const prevCoord = { latitude: 48.8566, longitude: 2.3522 }; // Paris
// const currentCoord = { latitude: 48.8567, longitude: 2.3523 }; // Slightly shifted
// const nextCoord = generateNextCoordinate(prevCoord, currentCoord);
// console.log(nextCoord);
