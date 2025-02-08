import { auth, signOut } from "@/auth";
import Image from "next/image";
import mapIcon from "@/assets/images/map_icon.png";
import Link from "next/link";

export default async function SignOutPage() {
  const session = await auth();

  return (
    <div className="lg:px-8 space-y-7 flex flex-col justify-center min-h-full px-6 py-12">
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
            <>{`Bye "${session.user.name}"`}</>
          ) : (
            <>{`Identifiez-vous pour accéder à l'application`}</>
          )}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm space-y-5 text-center">
        {session && session.user ? (
          <>
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
          </>
        ) : (
          <Link
            className="text-base/6 w-fit block mx-auto font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700"
            href={"/sign-in"}
          >
            {`se connecter a un compte`}
          </Link>
        )}
      </div>
    </div>
  );
}
