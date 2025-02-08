import { auth } from "@/auth";
import Home from "@/components/pages/Home";
import { SessionProvider } from "next-auth/react";
import React from "react";

async function page() {
  const session = await auth();

  return (
    <SessionProvider basePath={"/auth"} session={session}>
      <Home></Home>
    </SessionProvider>
  );
}

export default page;
