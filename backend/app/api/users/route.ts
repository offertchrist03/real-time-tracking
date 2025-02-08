import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20"); // Valeur par défaut = 20

  try {
    const users = await prisma.users.findMany({
      where: {
        role: "user", // Filtrer les utilisateurs ayant le rôle 'user'
      },
      select: {
        id: true, // Sélectionner uniquement l'id
        name: true, // Sélectionner uniquement le nom
      },
      take: limit, // Limiter le nombre de résultats
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});
