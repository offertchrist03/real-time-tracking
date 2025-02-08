"use client";

import React, { Suspense, useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";
import { UserProps } from "@/types";
import { Session } from "next-auth";
import ToastLoading from "../loading/ToastLoading";

function Map({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<UserProps[] | null>(null);
  const [errFetchUsers, setErrFetchUsers] = useState(false);

  useEffect(() => {
    if (isLoading && users) {
      setIsLoading(false);
    }
  }, [users]);

  useEffect(() => {
    if (errFetchUsers) {
      setIsLoading(false);
    }
  }, [errFetchUsers]);
  // recuperer un utilisateur
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

      console.log(data);

      setUsers([data]);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l' utilisateur :",
        error
      );
      setErrFetchUsers(true);
    }
  };

  // recuperer tous les utilisateurs
  const fetchUsers = async (limit = 20) => {
    try {
      const res = await fetch(`/api/users?limit=${limit}`);

      const data = await res.json();
      if (!data) {
        setErrFetchUsers(true);
      }

      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setErrFetchUsers(true);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      if (session.user.role.toLowerCase() === "admin") {
        // recupere tous les utilisateur (default limit 20)
        fetchUsers(2);
      } else {
        // recupere la session
        const id = session.user.id || session.user.name;
        fetchUser(id);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <>
        {session && (
          <ToastLoading text="recuperation des utilisateurs"></ToastLoading>
        )}
      </>
    );
  }

  return (
    <Suspense fallback={<>chargement fallback...</>}>
      <LeafletMap users={users}></LeafletMap>
    </Suspense>
  );
}

export default Map;
