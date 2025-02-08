"use client";

import React, { Suspense, useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";
import { UserProps } from "@/types";
import { Session } from "next-auth";

function Map({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // recuperer un utilisateur
  const fetchUser = async (id: string) => {
    if (!id) {
      console.log("No id");
      return [];
    }

    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();

      console.log(data);

      setUsers(data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l' utilisateur :",
        error
      );
    }
  };

  // recuperer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users?limit=2");
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const [users, setUsers] = useState<UserProps[] | null>(null);
  useEffect(() => {
    if (session && session.user) {
      if (session.user.role.toLowerCase() === "admin") {
        // recupere tous les utilisateur (limit 20)
        fetchUsers();
      } else {
        // recupere la session
        const id = session.user.id || session.user.name;
        fetchUser(id);
      }
    }
  }, []);

  if (isLoading) {
    return <>chargement...</>;
  }

  return (
    <Suspense fallback={<>chargement fallback...</>}>
      <LeafletMap users={users}></LeafletMap>
    </Suspense>
  );
}

export default Map;
