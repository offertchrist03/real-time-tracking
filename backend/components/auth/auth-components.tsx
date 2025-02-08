import { signIn, signOut } from "@/auth";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button type="submit">Sign In</button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
