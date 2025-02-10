import { Session } from "next-auth";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import mapIcon from "@/assets/images/map_icon.png";

function Header({ session }: { session: Session | null }) {
  return (
    <>
      <div className=" min-h-16 flex items-center justify-between w-full h-16 px-5 bg-gray-100 border-b border-gray-300">
        <Link
          href={"/"}
          className="w-fit h-fit flex items-center text-sm font-bold uppercase"
        >
          <span className="aspect-video object-center h-10">
            <Image
              priority={true}
              className="object-contain object-center w-full h-full"
              alt="map_icon.png"
              src={mapIcon.src}
              height={mapIcon.height}
              width={mapIcon.width}
            ></Image>
          </span>

          <span className="text-base text-gray-900 truncate hidden sm:inline">
            traking-app
          </span>
        </Link>

        <div className="flex items-baseline gap-5">
          {session && session.user ? (
            <>
              <div className="">
                <span className="underline capitalize">
                  {session.user.name}
                </span>

                {session.user.role.toLocaleLowerCase() === "admin" && (
                  <span className="bg-blue-50 ring-1 ring-blue-600/20 ring-inset inline-flex items-center px-2 py-1 ml-3 text-xs font-medium font-bold text-blue-800 uppercase rounded-md">
                    {session.user.role}
                  </span>
                )}
              </div>

              <Link
                className="text-base/6 truncate font-medium bg-red-600 px-3 py-1.5 rounded-md text-white hover:bg-red-700"
                href={"/sign-out"}
              >
                se deconnecter
              </Link>
            </>
          ) : (
            <Link
              className="text-base/6 truncate font-medium bg-blue-600 px-3 py-1.5 rounded-md text-white hover:bg-blue-700"
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
