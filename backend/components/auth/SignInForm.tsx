import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import CatchAuthErrors from "./CatchAuthErrors";

function SignInForm() {
  return (
    <>
      <CatchAuthErrors></CatchAuthErrors>

      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              console.log(error);
              return redirect(`/sign-in?err=${error.name}`);
            }
            throw error;
          }
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
    </>
  );
}

export default SignInForm;
