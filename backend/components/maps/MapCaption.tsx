import Link from "next/link";
import React from "react";

function MapCaption() {
  return (
    <section className="lg:px-8 fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen min-h-full px-6 py-12 pointer-events-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-3">
        <p className="text-2xl/9 mt-7 font-semibold tracking-tight text-center text-gray-900 pointer-events-auto">
          <span className="p-2 py-1 bg-yellow-500">Connectez vous</span> et
          visualiser les coordonnees.
        </p>

        <Link
          className="text-base/6 font-medium bg-blue-600 px-3 py-2 rounded-md text-white hover:bg-blue-700 flex justify-center pointer-events-auto"
          href={"/sign-in"}
        >
          se connecter maintenant !
        </Link>
      </div>
    </section>
  );
}

export default MapCaption;
