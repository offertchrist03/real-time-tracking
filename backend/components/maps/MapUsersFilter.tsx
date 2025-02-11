"use client";

import { UserProps } from "@/types";
import React, { useState } from "react";

function MapUsersFilter({
  users,
  selectUser,
  setSelectUser,
}: {
  users: UserProps[] | null;
  selectUser: number | null;
  setSelectUser: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Vérifie si la liste des utilisateurs est vide ou inexistante
  if (!users || users.length < 1) {
    return <></>;
  }

  return (
    <div className="top-20 right-5 backdrop-blur w-fit min-w-40 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 hover:border-blue-600 fixed z-[999] block text-base text-gray-900 bg-white border border-gray-400 rounded-md">
      <div className="flex overflow-hidden">
        {/* Affiche le nom de l'utilisateur sélectionné ou un texte par défaut */}
        <span
          className="block px-3 py-1.5 cursor-pointer w-full"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {(users.filter((user) => user.id === selectUser) &&
            users.filter((user) => user.id === selectUser)[0] &&
            users.filter((user) => user.id === selectUser)[0].name) ||
            "<choisir utilisateur>"}
        </span>

        {/* Affiche le bouton de suppression si un utilisateur est sélectionné */}
        {users.filter((user) => user.id === selectUser) &&
          users.filter((user) => user.id === selectUser)[0] && (
            <span className="block p-1">
              <span
                className="hover:bg-red-700 block h-full px-3 text-white bg-red-600 rounded-md cursor-pointer"
                onClick={() => {
                  setSelectUser(0); // Réinitialise la sélection
                  setIsOpen(false);
                }}
              >
                x
              </span>
            </span>
          )}
      </div>

      {/* Liste déroulante des utilisateurs non sélectionnés */}
      {isOpen && (
        <ul
          className="absolute w-full h-fit max-h-[60vh] overflow-auto top-full left-0 bg-white rounded-md translate-y-1 cursor-pointer border border-gray-400"
          onMouseLeave={() => {
            setIsOpen(false);
          }}
        >
          {users
            .filter((user) => user.id !== selectUser) // Exclut l'utilisateur déjà sélectionné
            .map((user) => (
              <li
                onClick={() => {
                  setSelectUser(user.id); // Sélectionne un utilisateur
                  setIsOpen(false);
                }}
                key={user.id}
                value={user.id}
                className="outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 hover:outline-2 hover:-outline-offset-2 hover:bg-gray-100 sm:text-sm/6 block w-full px-3 py-1 text-base text-gray-900"
              >
                {user.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default MapUsersFilter;
