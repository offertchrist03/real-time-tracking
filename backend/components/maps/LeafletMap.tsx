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
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <ToastLoading text="generer la carte"></ToastLoading>
      </>
    );
  }

  return (
    <MapContainer
      center={[-18.8792, 47.5079]} // ANTANANARIVO
      zoom={17}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://christ-offert.vercel.app/">christ-offert</a>'
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
