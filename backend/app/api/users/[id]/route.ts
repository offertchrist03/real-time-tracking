// api/users/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Destructuration de 'params' pour accéder à 'id'
  const id = (await params).id;

  try {
    try {
      // Tentative de requête avec 'id' pour récupérer un
      const user = await prisma.users.findUnique({
        where: { id: Number(id) },
        select: {
          id: true, // Sélectionner uniquement l'id
          name: true, // Sélectionner uniquement le nom
          password: false,
          role: true,
        },
      });

      // Retourner les données de l'utilisateur en format JSON
      return NextResponse.json(user, { status: 200 });
    } catch (err) {
      console.log(err);

      // Si une erreur survient, tenter une recherche avec 'name' à la place de 'id'
      const user = await prisma.users.findUnique({
        where: { name: id },
        select: {
          id: true, // Sélectionner uniquement l'id
          name: true, // Sélectionner uniquement le nom
          password: false,
          role: true,
        },
      });

      // Retourner les données trouvées par 'name'
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);

    // Retourner une erreur 500 en cas de problème serveur
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
