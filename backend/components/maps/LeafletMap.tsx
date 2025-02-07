"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

interface Position {
  lat: number;
  lng: number;
}

const LeafletMap = () => {
  // État pour stocker la liste des positions
  const [positions, setPositions] = useState<Position[]>([
    { lat: -18.8792, lng: 47.5079 }, // Position initiale
  ]);

  // Création d'un marqueur personnalisé avec un <span> rond jaune
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<span style="background-color: yellow; border: 3px solid #ffcc00; box-sizing: border-box; border-radius: 50%; width: 30px; height: 30px; display: inline-block; text-align: center; line-height: 30px;"></span>', // <span> rond et jaune
    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 15], // Point d'ancrage de l'icône
    popupAnchor: [0, -15], // Position du popup
  });

  // Exemple d'actualisation de positions toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      // Pour l'exemple, on ajoute une nouvelle position légèrement décalée
      setPositions((prevPositions) => {
        const last = prevPositions[prevPositions.length - 1];
        return [
          ...prevPositions,
          { lat: last.lat + 0.0002, lng: last.lng + 0.0002 },
        ];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[-18.8792, 47.5079]} // ANTANANARIVO
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      {/* TileLayer pour charger la tuile OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Affichage des marqueurs avec l'icône personnalisée pour chaque position */}
      {positions.map((pos, index) => (
        <Marker key={index} position={[pos.lat, pos.lng]} icon={customIcon}>
          <Popup>Position {index + 1}</Popup>
        </Marker>
      ))}

      {/* Draw a red line connecting the last two positions */}
      {positions.length > 1 && <Polyline positions={positions} color="red" />}
    </MapContainer>
  );
};

export default LeafletMap;
