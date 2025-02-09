import SignOutPage from "@/components/auth/SignOut";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tracking-APP | Déconnexion",
  description: "APP that generate random movement of users",
};

function page() {
  return <SignOutPage></SignOutPage>;
}

export default page;
