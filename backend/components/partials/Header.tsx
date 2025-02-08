import { Session } from "next-auth";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import mapIcon from "@/assets/images/map_icon.png";

function Header({ session }: { session: Session | null }) {
  return (
    <>
      <div className=" bg-neutral-100 min-h-12 flex items-center justify-between w-full h-12 px-5">
        <Link
          href={"/"}
          className="w-fit h-fit text-sm font-bold uppercase flex items-center "
        >
          <span className="aspect-video object-center h-10">
            <Image
              className="object-contain object-center w-full h-full"
              alt="map_icon.png"
              src={mapIcon.src}
              height={mapIcon.height}
              width={mapIcon.width}
            ></Image>
          </span>

          <span className="">traking-app</span>
        </Link>

        <div className="flex items-baseline gap-5">
          {session && session.user ? (
            <>
              <div className="">
                <span className="underline capitalize">
                  {session.user.name}
                </span>

                {session.user.role.toLocaleLowerCase() === "admin" && (
                  <span className="ml-3 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-blue-600/20 ring-inset uppercase font-bold">
                    {session.user.role}
                  </span>
                )}
              </div>

              <Link
                className="text-base/6 font-medium bg-red-600 px-3 py-1.5 rounded-md text-white hover:bg-red-700"
                href={"/sign-out"}
              >
                se deconnecter
              </Link>
            </>
          ) : (
            <Link
              className="text-base/6 font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700"
              href={"/sign-in"}
            >
              se connecter
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
