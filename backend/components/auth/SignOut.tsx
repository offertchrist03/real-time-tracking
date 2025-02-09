import { auth, signOut } from "@/auth";
import Link from "next/link";
import LogsLayout from "./LogsLayout";

export default async function SignOutPage() {
  const session = await auth();

  return (
    <LogsLayout
      sessionGreeting={
        <span className="p-2 py-1 text-gray-900 bg-yellow-400">{`Bye "${session?.user.name}"`}</span>
      }
      noSessionGreeting={
        <>
          <span className="w-fit block p-2 py-1 mx-auto mb-3 text-lg text-gray-900 bg-yellow-400">{`PAS DE COMPTE`}</span>

          <p className="">{`Identifiez-vous pour accéder à l'application`}</p>
        </>
      }
      sessionChildren={
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-7 space-y-5 text-center">
          <h5>{`Êtes-vous sûr de vouloir vous déconnecter ?`}</h5>
          <form
            className=""
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="text-base/6 font-medium bg-red-600 px-3 py-1.5 rounded-md text-white hover:bg-red-700"
              type="submit"
            >
              se deconnecter
            </button>
          </form>
        </div>
      }
      noSessionChildren={
        <Link
          className="text-base/6 w-fit block mx-auto font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700 mt-7"
          href={"/sign-in"}
        >
          {`se connecter a un compte`}
        </Link>
      }
    ></LogsLayout>
  );
}
