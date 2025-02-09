"use client";

import { MouvementProps, UserProps } from "@/types";
import React, { useEffect, useState } from "react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { mapPin } from "./leafleft-components";
import ToastLoading from "../loading/ToastLoading";

function UserMovements({ user }: { user: UserProps }) {
  const [isLoading, setIsLoading] = useState(true);
  // État pour stocker la liste des positions
  const [positions, setPositions] = useState<MouvementProps[] | null>(null);

  // recuperer tous les mouvements utilisateurs
  const getMovements = async (limit = 50) => {
    try {
      const res = await fetch(
        `/api/movements/${user.id}${limit ? "?limit=" + limit : ""}`
      );
      const data: MouvementProps[] = await res.json();

      if (data || !data) {
        setIsLoading(false);
      }

      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      return null;
    }
  };

  const getAllPreviousMovements = async () => {
    const allPositions = await getMovements();
    if (allPositions && allPositions.length > 0) {
      setPositions(allPositions);
    }
  };

  const getLastMovementThenUpdateMovement = async () => {
    const lastMouvements = await getMovements(1);

    if (
      !(
        positions &&
        positions.length > 0 &&
        lastMouvements &&
        lastMouvements.length > 0
      ) ||
      (positions[0].id === lastMouvements[lastMouvements.length - 1].id &&
        positions[0].latitude ===
          lastMouvements[lastMouvements.length - 1].latitude &&
        positions[0].longitude ===
          lastMouvements[lastMouvements.length - 1].longitude) ||
      (positions[positions.length - 1].latitude ===
        lastMouvements[lastMouvements.length - 1].latitude &&
        positions[positions.length - 1].longitude ===
          lastMouvements[lastMouvements.length - 1].longitude)
    ) {
      return;
    }

    setPositions((prevPositions) => {
      if (lastMouvements && lastMouvements.length > 0 && prevPositions) {
        return [...prevPositions, ...lastMouvements];
      }
      return [...lastMouvements];
    });
  };

  useEffect(() => {
    if (isLoading && positions) {
      setIsLoading(false);
    }
  }, [positions]);

  useEffect(() => {
    getAllPreviousMovements();
  }, []);

  // Exemple d'actualisation de positions toutes les 5 secondes
  useEffect(() => {
    // Pour l'exemple, on ajoute une nouvelle position légèrement décalée
    const interval = setInterval(() => {
      if (!(positions && positions.length > 0)) {
        getAllPreviousMovements();
      }

      getLastMovementThenUpdateMovement();
    }, 5000);

    return () => clearInterval(interval);
  }, [positions]);

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

  if (isLoading) {
    return <ToastLoading text="recuperation des coordonnees"></ToastLoading>;
  }

  if (!(positions && positions.length > 0)) {
    return <></>;
  }

  return (
    <React.Fragment>
      {/* Affichage des marqueurs avec l'icône personnalisée pour chaque utilisateurs */}
      {positions.map((pos, index) => (
        <Marker
          key={index}
          position={[pos.latitude, pos.longitude]}
          icon={mapPin({
            start: index === 0,
            last: index === positions.length - 1,
          })}
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
