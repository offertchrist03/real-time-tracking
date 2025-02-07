import React from "react";
import Map from "../maps/Map";
import Header from "../partials/Header";

function Home() {
  return (
    <main className="w-screen h-screen relative flex flex-col">
      <Header></Header>

      <Map></Map>
    </main>
  );
}

export default Home;
