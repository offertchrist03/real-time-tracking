"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

function CatchAuthErrors() {
  const searchParams = useSearchParams();
  const err = searchParams.get("err");

  return (
    <div className="w-full max-w-xs p-3 fixed top-0 left-0 z-50 bg-red-600 ">
      <h3 className="">CatchAuthErrors</h3>
      <p className="">{err}</p>
    </div>
  );
}

export default CatchAuthErrors;
