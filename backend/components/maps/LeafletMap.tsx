"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { UserProps } from "@/types";
import UserMovements from "./UserMovements";

const LeafletMap = ({ users }: { users: UserProps[] | null }) => {
  return (
    <MapContainer
      center={[-18.8792, 47.5079]} // ANTANANARIVO
      zoom={20}
      style={{ height: "100%", width: "100%" }}
    >
      {/* TileLayer pour charger la tuile OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* affiche tous les utilisateurs sur la carte */}
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <UserMovements key={user.id} user={user}></UserMovements>
        ))}
    </MapContainer>
  );
};

export default LeafletMap;
