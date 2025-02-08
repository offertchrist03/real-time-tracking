import React from "react";
import Map from "../maps/Map";
import Header from "../partials/Header";
import { auth } from "@/auth";

async function Home() {
  const session = await auth();

  return (
    <main className="relative flex flex-col w-screen h-screen overflow-hidden">
      <Header session={session}></Header>

      <div className="relative w-full h-full">
        {session && <Map session={session}></Map>}
      </div>
    </main>
  );
}

export default Home;
