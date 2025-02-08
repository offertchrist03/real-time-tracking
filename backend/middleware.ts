import { auth } from "@/auth";
export { auth as middleware } from "@/auth";

export default auth((req) => {
  console.log(req.auth); //  { session: { user: { ... } } }
});

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
