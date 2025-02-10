"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CatchAuthErrors() {
  const searchParams = useSearchParams();

  const [err, setErr] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const error = searchParams.get("err");

    if (!error) {
      return;
    }

    switch (error) {
      case "CredentialsSignin":
        setErr("Verifier votre idendifiant et mot de passe");
        break;

      default:
        setErr("Erreur non definie");
        break;
    }

    setShow(true);
  }, [searchParams]);

  useEffect(() => {
    if (err && show) {
      const timer = setTimeout(() => {
        setShow(false);
        setErr("");
        clearTimeout(timer);
      }, 5000);
    }
  }, [err, show]);

  return (
    <>
      {show && (
        <div
          onClick={() => {
            setShow(false);
          }}
          className="sm:mx-auto sm:w-full sm:max-w-sm p-3 border border-red-800 rounded-md top-10 fixed left-1/2 -translate-x-1/2 z-50 bg-red-600 cursor-pointer"
        >
          <h3 className="text-white text-center uppercase font-bold">{`erreur lors de l'authentification`}</h3>
          <p className="text-center text-gray-100">{err}</p>
        </div>
      )}
    </>
  );
}

export default CatchAuthErrors;
