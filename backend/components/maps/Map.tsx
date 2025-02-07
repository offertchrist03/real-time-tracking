"use client";

import React, { Suspense, useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";
import { UserProps } from "@/types";

function Map() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

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
    fetchUsers();
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
