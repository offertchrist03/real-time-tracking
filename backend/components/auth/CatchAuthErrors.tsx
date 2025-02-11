"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CatchAuthErrors() {
  const searchParams = useSearchParams(); // Récupère les paramètres de l'URL

  const [err, setErr] = useState<string | null>(null); // État pour stocker le message d'erreur
  const [show, setShow] = useState(false); // État pour contrôler l'affichage du message d'erreur

  useEffect(() => {
    const error = searchParams.get("err"); // Cherche le paramètre "err" dans l'URL

    if (!error) {
      return; // Si le paramètre "err" n'existe pas, on quitte l'effet
    }

    switch (
      error // On gère différentes erreurs basées sur la valeur du paramètre "err"
    ) {
      case "CredentialsSignin":
        setErr("Verifier votre idendifiant et mot de passe"); // Erreur de connexion
        break;

      default:
        setErr("Erreur non definie"); // Message générique pour toute autre erreur
        break;
    }

    setShow(true); // On montre le message d'erreur
  }, [searchParams]); // Cet effet se déclenche à chaque changement des paramètres d'URL

  useEffect(() => {
    if (err && show) {
      // Si une erreur est présente et doit être affichée
      const timer = setTimeout(() => {
        setShow(false); // Cacher le message après 5 secondes
        setErr(""); // Réinitialiser le message d'erreur
        clearTimeout(timer); // Nettoyer le timer une fois qu'il est exécuté
      }, 5000); // Le délai avant la disparition du message
    }
  }, [err, show]); // Cet effet dépend des états err et show

  return (
    <>
      {show && ( // Si 'show' est true, on affiche le message d'erreur
        <div
          onClick={() => {
            setShow(false); // On cache le message d'erreur au clic
          }}
          className="sm:mx-auto sm:w-full sm:max-w-sm p-3 border border-red-800 rounded-md top-10 fixed left-1/2 -translate-x-1/2 z-50 bg-red-600 cursor-pointer"
        >
          <h3 className="text-white text-center uppercase font-bold">{`erreur lors de l'authentification`}</h3>

          {/* Affichage du message d'erreur */}
          <p className="text-center text-gray-100">{err}</p>
        </div>
      )}
    </>
  );
}

export default CatchAuthErrors;
