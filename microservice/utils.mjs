// Fonction qui génère une nouvelle coordonnée aléatoire dans un rayon de <maxDistance> mètres autour d'un point donné
export const generateRandomCoordinate = (
  latitude,
  longitude,
  maxDistance = 50
) => {
  const earthRadius = 6371000; // Rayon moyen de la Terre en mètres
  const delta = maxDistance / earthRadius; // Distance en radians

  // Génère un angle aléatoire en radians pour choisir une direction
  const theta = Math.random() * 2 * Math.PI;

  // Calcule les décalages de latitude et de longitude
  const deltaLat = delta * Math.cos(theta);
  const deltaLng =
    (delta * Math.sin(theta)) / Math.cos((latitude * Math.PI) / 180);

  // Convertit les décalages en degrés et applique aux coordonnées d'origine
  const newLatitude = latitude + (deltaLat * 180) / Math.PI;
  const newLongitude = longitude + (deltaLng * 180) / Math.PI;

  return { latitude: newLatitude, longitude: newLongitude };
};

// Fonction utilitaire pour convertir des degrés en radians
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Fonction utilitaire pour convertir des radians en degrés
function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

// Fonction qui génère une coordonnée adjacente aux deux dernières positions pour un déplacement plus réaliste
export function generateNextCoordinate(
  prevCoord,
  currentCoord,
  stepRange = 50
) {
  const earthRadius = 6371000; // Rayon moyen de la Terre en mètres
  const maxDistance = stepRange; // Distance maximale que l'on peut parcourir en un pas

  // Fonction qui calcule l'angle (bearing) entre deux points géographiques en utilisant la formule de Haversine
  function haversineBearing(coord1, coord2) {
    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);
    const dLon = lon2 - lon1; // Différence de longitude

    // Calcul du cap initial entre les deux points
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    return Math.atan2(y, x); // Retourne l'angle en radians
  }

  // Détermine la direction initiale du mouvement entre les deux dernières positions
  const initialBearing = haversineBearing(prevCoord, currentCoord);

  // Ajoute une courbure aléatoire au mouvement pour éviter des déplacements trop linéaires
  const angleVariation = (Math.random() - 0.5) * (Math.PI / 4); // Déviation aléatoire max ±45°
  const curvedBearing = initialBearing + angleVariation;

  // Génère une distance de déplacement aléatoire pour simuler des pas naturels
  const randomDistance = maxDistance * (0.75 + Math.random() * 0.5);

  // Conversion des coordonnées actuelles en radians
  const lat1 = toRadians(currentCoord.latitude);
  const lon1 = toRadians(currentCoord.longitude);

  // Calcul de la nouvelle latitude en appliquant la distance et la direction modifiée
  const newLat = Math.asin(
    Math.sin(lat1) * Math.cos(randomDistance / earthRadius) +
      Math.cos(lat1) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(curvedBearing)
  );

  // Calcul de la nouvelle longitude en prenant en compte la rotation terrestre
  const newLon =
    lon1 +
    Math.atan2(
      Math.sin(curvedBearing) *
        Math.sin(randomDistance / earthRadius) *
        Math.cos(lat1),
      Math.cos(randomDistance / earthRadius) - Math.sin(lat1) * Math.sin(newLat)
    );

  // Convertit les nouvelles coordonnées en degrés avant de les retourner
  return { latitude: toDegrees(newLat), longitude: toDegrees(newLon) };
}
