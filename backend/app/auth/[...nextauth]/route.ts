// auth/[...nextauth]/route.ts
export const config = {
  runtime: "nodejs",
};

import { handlers } from "@/auth";
export const { GET, POST } = handlers;

// export const runtime = "edge"
