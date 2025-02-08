import Image from "next/image";
import React from "react";
import mapIcon from "@/assets/images/map_icon.png";
import { auth, signIn } from "@/auth";
import Link from "next/link";

async function SignInPage() {
  const session = await auth();

  return (
    <div className="lg:px-8 flex flex-col justify-center min-h-full px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="aspect-video object-center h-20 mx-auto">
          <Image
            className="object-contain object-center w-full h-full"
            alt="map_icon.png"
            src={mapIcon.src}
            height={mapIcon.height}
            width={mapIcon.width}
          ></Image>
        </div>
        <h2 className="text-2xl/9 mt-7 font-bold tracking-tight text-center text-gray-900">
          {session && session.user ? (
            <>{`hello "${session.user.name}" !`}</>
          ) : (
            <>{`Identifiez-vous pour accéder à l'application`}</>
          )}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {session && session.user ? (
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
        ) : (
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="pb-10 mt-10 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="text-sm/6 block font-medium text-gray-900"
              >
                Identifiant
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 border border-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm/6 block font-medium text-gray-900"
                >
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 border border-gray-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Se Connecter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignInPage;
