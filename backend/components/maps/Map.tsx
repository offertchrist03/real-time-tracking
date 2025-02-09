"use client";

import React, { useEffect, useState } from "react";
import { UserProps } from "@/types";
import { Session } from "next-auth";
import ToastLoading from "../loading/ToastLoading";
import LeafletMap from "./LeafletMap";
import MapCaption from "./MapCaption";

function Map({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState(true);

  const [selectUser, setSelectUser] = useState<number | null>(null);
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

  const filterUsers = (id: number | null, users: UserProps[] | null) => {
    if (!users) {
      return null;
    }
    if (!id) {
      return users;
    }
    const filteredUsers = users.filter((user) => user.id === selectUser);
    return filteredUsers;
  };

  if (isLoading) {
    return (
      <>
        <ToastLoading text="recuperation des utilisateurs"></ToastLoading>
      </>
    );
  }

  return (
    <>
      {!session && <MapCaption></MapCaption>}

      {session &&
        session.user &&
        session.user.role === "admin" &&
        users &&
        users.length > 1 && (
          <div className="top-20 right-5 border-zinc-400 bg-zinc-100 w-fit fixed z-50 p-4 border-2 rounded-lg">
            <div className="space-y-1">
              <label htmlFor="userLimit" className="text-sm">
                selectionner utilisateur
              </label>
              <select
                name="userLimit"
                id="userLimit"
                onChange={(e) => {
                  e.preventDefault();
                  setSelectUser(parseInt(e.target.value));
                }}
                className="block w-full min-w-20 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 border border-gray-400"
              >
                <option value={""}>{"tout"}</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

      <LeafletMap users={filterUsers(selectUser, users)}></LeafletMap>
    </>
  );
}

export default Map;
