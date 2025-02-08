import React from "react";
import Map from "../maps/Map";
import Header from "../partials/Header";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session } = useSession();

  return (
    <main className="relative flex flex-col w-screen h-screen">
      <Header></Header>

      <Map session={session}></Map>
    </main>
  );
}

export default Home;
