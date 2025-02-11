import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import SignInForm from "./SignInForm";
import LogsLayout from "./LogsLayout";

async function SignInPage() {
  const session = await auth(); // Vérification de la session utilisateur (si l'utilisateur est connecté)

  return (
    // Le layout "LogsLayout" est utilisé pour gérer l'affichage conditionnel en fonction de l'état de la session
    <LogsLayout
      sessionGreeting={
        // Si l'utilisateur est connecté, on lui souhaite la bienvenue avec son nom
        <span className="p-2 py-1 text-gray-900 bg-yellow-400">{`hello "${session?.user.name}"`}</span>
      }
      noSessionGreeting={
        // Si l'utilisateur n'est pas connecté, on affiche un message générique pour inviter à la connexion
        <span className="w-fit block p-2 py-1 mx-auto text-lg text-gray-900 bg-yellow-400">{`CONNEXION - TRACKING APP`}</span>
      }
      sessionChildren={
        // Si l'utilisateur est déjà connecté, on lui affiche des informations et un lien pour accéder à l'application
        <div className="mt-10 space-y-10">
          <p className="font-medium text-center text-gray-900">
            {`Vous êtes déjà connecté ! Vous pouvez accéder à votre compte et commencer à utiliser toutes les fonctionnalités.`}
          </p>

          {/* Lien pour accéder directement à l'application */}
          <Link
            href={"/"} // Lien vers la page d'accueil de l'application
            className="w-fit flex items-center mx-auto text-base/6 font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700"
          >
            {`Acceder a l'application`}
          </Link>
        </div>
      }
      noSessionChildren={<SignInForm></SignInForm>} // Si l'utilisateur n'est pas connecté, on lui affiche le formulaire de connexion
    ></LogsLayout>
  );
}

export default SignInPage;
