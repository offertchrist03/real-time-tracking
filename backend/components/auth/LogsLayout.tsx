import Image from "next/image";
import React from "react";
import mapIcon from "@/assets/images/map_icon.png";
import { auth } from "@/auth";

// Layout des logs avec gestion de session
async function LogsLayout({
  sessionGreeting, // Message de bienvenue en cas de session active
  noSessionGreeting, // Message en l'absence de session
  sessionChildren, // Contenu à afficher si la session est active
  noSessionChildren, // Contenu à afficher si la session est absente
}: {
  sessionGreeting: React.ReactNode; // Le message de bienvenue si une session est active
  noSessionGreeting: React.ReactNode; // Le message à afficher si la session est absente
  sessionChildren: React.ReactNode; // Contenu à afficher lorsque l'utilisateur est connecté
  noSessionChildren: React.ReactNode; // Contenu à afficher lorsque l'utilisateur n'est pas connecté
}) {
  const session = await auth(); // Récupération de l'état de la session (utilisateur connecté ou non)

  return (
    <div className="lg:px-8 flex flex-col justify-center min-h-full px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="aspect-video object-center h-20 mx-auto">
          <Image
            priority={true} // Priorité donnée au chargement de l'image pour la performance
            className="object-contain object-center w-full h-full" // Assure que l'image est correctement dimensionnée et centrée
            alt="map_icon.png" // Texte alternatif pour l'image
            src={mapIcon.src} // Source de l'image (importée plus haut)
            height={mapIcon.height} // Hauteur de l'image (provenant de l'import)
            width={mapIcon.width} // Largeur de l'image (provenant de l'import)
          ></Image>
        </div>
        <h2 className="text-2xl/9 mt-7 font-bold tracking-tight text-center text-gray-900">
          {session && session.user ? (
            // Si la session est active, afficher le message de bienvenue pour l'utilisateur connecté
            <>{sessionGreeting}</>
          ) : (
            // Sinon, afficher un message pour les utilisateurs non connectés
            <>{noSessionGreeting}</>
          )}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {session && session.user ? (
          // Si la session est active, afficher le contenu pour les utilisateurs connectés
          <>{sessionChildren}</>
        ) : (
          // Sinon, afficher le contenu pour les utilisateurs non connectés
          <>{noSessionChildren}</>
        )}
      </div>
    </div>
  );
}

export default LogsLayout;
