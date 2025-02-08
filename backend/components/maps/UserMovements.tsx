"use client";

import { MouvementProps, UserProps } from "@/types";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Marker, Polyline, Popup } from "react-leaflet";

function UserMovements({ user }: { user: UserProps }) {
  // genere des positions aleatoires
  const generateRandomCoordinate = (
    latitude: number,
    longitude: number,
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

  // État pour stocker la liste des positions
  const [positions, setPositions] = useState<MouvementProps[] | null>(null);

  // Exemple d'actualisation de positions toutes les 5 secondes
  useEffect(() => {
    // Pour l'exemple, on ajoute une nouvelle position légèrement décalée
    const interval = setTimeout(() => {
      setPositions((prevPositions) => {
        if (!prevPositions) {
          return [
            {
              id: 1,
              user_id: 1,
              latitude: -18.8792,
              longitude: 47.5079,
              movement_at: new Date().toISOString(),
            },
          ];
        }

        const last = prevPositions[prevPositions.length - 1];

        const nextPos = generateRandomCoordinate(last.latitude, last.longitude);

        return [
          ...prevPositions,
          {
            id: last.id + 1,
            user_id: last.user_id,
            latitude: nextPos.latitude,
            longitude: nextPos.longitude,
            movement_at: new Date().toISOString(),
          },
        ];
      });
    }, 5000);

    return () => clearTimeout(interval);
  }, []);

  // recuperer uniquement les latitude et longitude
  const getLatLng = (moves: MouvementProps[] | null) => {
    const res: { lat: number; lng: number }[] = [];
    if (!moves) {
      return res;
    }
    for (let index = 0; index < moves.length; index++) {
      const movement = {
        lat: moves[index].latitude,
        lng: moves[index].longitude,
      };
      res.push(movement);
    }
    return res;
  };

  // Création d'un marqueur personnalisé avec un <span> rond jaune
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: '<span style="background-color: yellow; border: 3px solid #ffcc00; box-sizing: border-box; border-radius: 50%; width: 30px; height: 30px; display: inline-block; text-align: center; line-height: 30px;"></span>', // <span> rond et jaune
    iconSize: [30, 30], // Taille de l'icône
    iconAnchor: [15, 15], // Point d'ancrage de l'icône
    popupAnchor: [0, -15], // Position du popup
  });

  return (
    <React.Fragment>
      {/* Affichage des marqueurs avec l'icône personnalisée pour chaque utilisateurs */}
      {positions &&
        positions.map((pos, index) => (
          <Marker
            key={index}
            position={[pos.latitude, pos.longitude]}
            icon={customIcon}
          >
            <Popup>{user.name}</Popup>
          </Marker>
        ))}

      {/* relie les positions de l'utilisateur avec une ligne rouge */}
      {positions && positions.length > 1 && (
        <Polyline positions={getLatLng(positions)} color="red" />
      )}
    </React.Fragment>
  );
}

export default UserMovements;
