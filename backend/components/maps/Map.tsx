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
    return <ToastLoading text="recuperation des utilisateurs"></ToastLoading>;
  }

  return (
    <>
      {!session && <MapCaption></MapCaption>}

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
