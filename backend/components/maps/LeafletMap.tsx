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

interface PositionProps {
  id: number;
  user_id: number;
  latitude: number;
  longitude: number;
  movement_at: string;
}

interface UserProps {
  id: number;
  name: string;
  passwor: string;
  role: "user" | "admin";
}

const LeafletMap = ({
  users,
  movements,
}: {
  users: UserProps[] | null;
  movements: PositionProps[] | null;
}) => {
  // recuperer uniquement les latitude et longitude
  const getLatLng = (movements: PositionProps[] | null) => {
    let res: { lat: number; lng: number }[] = [];
    if (!movements) {
      return res;
    }
    for (let index = 0; index < movements.length; index++) {
      const movement = {
        lat: movements[index].latitude,
        lng: movements[index].longitude,
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

      {/* affiche tous les utilisateurs sur la carte */}
      {users && users.length > 0 && (
        <>
          {/* Affichage des marqueurs avec l'icône personnalisée pour chaque utilisateurs */}
          {movements &&
            movements.map((pos, index) => (
              <Marker
                key={index}
                position={[pos.latitude, pos.longitude]}
                icon={customIcon}
              >
                <Popup>Position {index + 1}</Popup>
              </Marker>
            ))}

          {/* relie les positions de l'utilisateur avec une ligne rouge */}
          {movements && movements.length > 1 && (
            <Polyline positions={getLatLng(movements)} color="red" />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default LeafletMap;
