"use client";

import React, { useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";

interface UserProps {
  id: number;
  name: string;
  passwor: string;
  role: "user" | "admin";
}

interface PositionProps {
  id: number;
  user_id: number;
  latitude: number;
  longitude: number;
  movement_at: string;
}

function Map() {
  // recuperer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const [users, setUsers] = useState<UserProps[] | null>(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  // État pour stocker la liste des positions
  const [positions, setPositions] = useState<PositionProps[] | null>(null);

  // Exemple d'actualisation de positions toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      // Pour l'exemple, on ajoute une nouvelle position légèrement décalée
      const interval = setInterval(() => {
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

          return [
            ...prevPositions,
            {
              id: last.id + 1,
              user_id: last.user_id,
              latitude: last.latitude + 0.0002,
              longitude: last.longitude + 0.0002,
              movement_at: new Date().toISOString(),
            },
          ];
        });
      }, 5000);

      return () => clearInterval(interval);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <LeafletMap users={users} movements={positions}></LeafletMap>;
}

export default Map;
