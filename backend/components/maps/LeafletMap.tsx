"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import UserMovements from "./UserMovements";
import ToastLoading from "../loading/ToastLoading";

const LeafletMap = ({ users }: { users: UserProps[] | null }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Désactive l'état de chargement après le premier rendu
  }, []);

  if (isLoading) {
    return <ToastLoading text="generer la carte"></ToastLoading>; // Affiche un message de chargement avant l'affichage de la carte
  }

  return (
    <MapContainer
      center={[-18.8792, 47.5079]} // Coordonnées d'Antananarivo (point de départ par défaut)
      zoom={17}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Fond de carte OpenStreetMap
        attribution='&copy; <a href="https://christ-offert.vercel.app/">christ-offert</a>'
      />

      {/* Affichage des mouvements des utilisateurs sur la carte */}
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <UserMovements key={user.id} user={user}></UserMovements>
        ))}
    </MapContainer>
  );
};

export default LeafletMap;
