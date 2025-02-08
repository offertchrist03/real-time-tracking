"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import UserMovements from "./UserMovements";
import Loading from "../loading/Loading";

const LeafletMap = ({ users }: { users: UserProps[] | null }) => {
  console.log("users =>> ", users);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <MapContainer
      center={[-18.8792, 47.5079]} // ANTANANARIVO
      zoom={17}
      style={{ height: "100%", width: "100%" }}
    >
      {/* TileLayer pour charger la tuile OpenStreetMap */}
      <TileLayer
        url="https://christ-offert.vercel.app/"
        attribution='&copy; <a href="https://christ-offert.vercel.app/">christ-offert</a>'
      />

      {isLoading && <Loading></Loading>}

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
