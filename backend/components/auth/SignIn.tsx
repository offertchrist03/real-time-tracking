import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import SignInForm from "./SignInForm";
import LogsLayout from "./LogsLayout";

async function SignInPage() {
  const session = await auth();

  return (
    <LogsLayout
      sessionGreeting={`hello "${session?.user.name}"`}
      noSessionGreeting={`Identifiez-vous pour accéder à l'application`}
      sessionChildren={
        <div className="mt-10 space-y-10">
          <p className="font-medium text-center">
            {`Vous êtes déjà connecté ! Vous pouvez accéder à votre compte et commencer à utiliser toutes les fonctionnalités.`}
          </p>

          <Link
            href={"/"}
            className="w-fit flex items-center mx-auto text-base/6 font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700"
          >
            {`Acceder a l'application`}
          </Link>
        </div>
      }
      noSessionChildren={<SignInForm></SignInForm>}
    ></LogsLayout>
  );
}

export default SignInPage;
