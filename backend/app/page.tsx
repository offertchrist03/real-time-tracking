import Loading from "@/components/loading/Loading";
import Home from "@/components/pages/Home";
import React, { Suspense } from "react";

function HomePage() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Home></Home>
    </Suspense>
  );
}

export default HomePage;
