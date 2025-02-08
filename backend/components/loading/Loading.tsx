import Image from "next/image";
import React from "react";
import mapIcon from "@/assets/images/map_icon.png";

function Loading() {
  return (
    <section className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen gap-5 bg-white">
      <div className="aspect-video object-center h-20 mx-auto">
        <Image
          className="object-contain object-center w-full h-full"
          alt="map_icon.png"
          src={mapIcon.src}
          height={mapIcon.height}
          width={mapIcon.width}
        ></Image>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">Tracking APP</h2>
        <span className="animate-pulse text-sm">chargement...</span>
      </div>
    </section>
  );
}

export default Loading;
