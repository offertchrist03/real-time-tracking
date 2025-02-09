"use client";

import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import { Session } from "next-auth";
import ToastLoading from "../loading/ToastLoading";
import LeafletMap from "./LeafletMap";
import Link from "next/link";

function Map({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<UserProps[] | null>(null);
  const [errFetchUsers, setErrFetchUsers] = useState(false);

  useEffect(() => {
    if (isLoading) {
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
        fetchUsers(20);
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
        <ToastLoading text="recuperation des utilisateurs"></ToastLoading>
      </>
    );
  }

  return (
    <>
      {!session && (
        <section className="lg:px-8 fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen min-h-full px-6 py-12 pointer-events-none">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-3">
            <h2 className="text-2xl/9 mt-7 font-semibold tracking-tight text-center text-gray-900 pointer-events-auto">
              connectez vous pour voir les coordonnees.
            </h2>

            <Link
              className="text-base/6 font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700 flex justify-center pointer-events-auto"
              href={"/sign-in"}
            >
              se connecter maintenant !
            </Link>
          </div>
        </section>
      )}
      <LeafletMap users={users}></LeafletMap>
    </>
  );
}

export default Map;
