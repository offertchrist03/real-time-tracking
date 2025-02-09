import Image from "next/image";
import React from "react";
import mapIcon from "@/assets/images/map_icon.png";
import { auth } from "@/auth";

async function LogsLayout({
  sessionGreeting,
  noSessionGreeting,
  sessionChildren,
  noSessionChildren,
}: {
  sessionGreeting: React.ReactNode;
  noSessionGreeting: React.ReactNode;
  sessionChildren: React.ReactNode;
  noSessionChildren: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="lg:px-8 flex flex-col justify-center min-h-full px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="aspect-video object-center h-20 mx-auto">
          <Image
            priority={true}
            className="object-contain object-center w-full h-full"
            alt="map_icon.png"
            src={mapIcon.src}
            height={mapIcon.height}
            width={mapIcon.width}
          ></Image>
        </div>
        <h2 className="text-2xl/9 mt-7 font-bold tracking-tight text-center text-gray-900">
          {session && session.user ? (
            <>{sessionGreeting}</>
          ) : (
            <>{noSessionGreeting}</>
          )}
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {session && session.user ? (
          <>{sessionChildren}</>
        ) : (
          <>{noSessionChildren}</>
        )}
      </div>
    </div>
  );
}

export default LogsLayout;
