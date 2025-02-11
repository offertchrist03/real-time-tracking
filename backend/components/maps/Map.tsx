"use client";

import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import { Session } from "next-auth";
import ToastLoading from "../loading/ToastLoading";
import LeafletMap from "./LeafletMap";
import MapCaption from "./MapCaption";
import MapUsersFilter from "./MapUsersFilter";

function Map({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectUser, setSelectUser] = useState<number | null>(null);
  const [users, setUsers] = useState<UserProps[] | null>(null);
  const [errFetchUsers, setErrFetchUsers] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false); // Désactive l'état de chargement après le premier rendu
    }
  }, [users]);

  useEffect(() => {
    if (errFetchUsers) {
      setIsLoading(false); // Désactive l'état de chargement en cas d'erreur de récupération
    }
  }, [errFetchUsers]);

  // Fonction qui récupère un utilisateur spécifique
  const fetchUser = async (id: string) => {
    if (!id) {
      console.log("No id");
      return [];
    }

    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();

      if (!data) {
        setErrFetchUsers(true);
      }

      setUsers([data]); // Stocke uniquement l'utilisateur récupéré
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      setErrFetchUsers(true);
    }
  };

  // Fonction qui récupère tous les utilisateurs avec une limite
  const fetchUsers = async (limit = 20) => {
    try {
      const res = await fetch(`/api/users?limit=${limit}`);
      const data = await res.json();

      if (!data) {
        setErrFetchUsers(true);
      }

      setUsers(data); // Stocke la liste des utilisateurs récupérés
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setErrFetchUsers(true);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      if (session.user.role.toLowerCase() === "admin") {
        fetchUsers(20); // Récupère tous les utilisateurs (limite 20 par défaut)
      } else {
        const id = session.user.id || session.user.name; // Identifiant de l'utilisateur
        fetchUser(id);
      }
    }
  }, []);

  // Fonction pour filtrer les utilisateurs sélectionnés
  const filterUsers = (id: number | null, users: UserProps[] | null) => {
    if (!users) {
      return null;
    }
    if (!id) {
      return users; // Retourne tous les utilisateurs si aucun filtre n'est appliqué
    }
    return users.filter((user) => user.id === selectUser);
  };

  if (isLoading) {
    return <ToastLoading text="récupération des utilisateurs"></ToastLoading>; // Affiche un message de chargement
  }

  return (
    <>
      {!session && <MapCaption></MapCaption>}{" "}
      {/* Affiche une légende si aucun utilisateur n'est connecté */}
      {session &&
        session.user &&
        session.user.role === "admin" &&
        users &&
        users.length > 1 && (
          <MapUsersFilter
            users={users}
            selectUser={selectUser}
            setSelectUser={setSelectUser}
          ></MapUsersFilter>
        )}
      <LeafletMap users={filterUsers(selectUser, users)}></LeafletMap>
    </>
  );
}

export default Map;
