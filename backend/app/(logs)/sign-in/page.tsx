import SignInPage from "@/components/auth/SignIn";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tracking-APP | Connexion",
  description: "APP that generate random movement of users",
};

function page() {
  return <SignInPage></SignInPage>;
}

export default page;
