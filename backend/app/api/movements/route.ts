import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/prisma";

export const GET = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50"); // Valeur par défaut = 50

  try {
    const movements = await prisma.movements.findMany({
      orderBy: {
        movement_at: "desc", // Trier par 'movement_at' en ordre décroissant
      },
      take: limit, // Limiter le nombre de résultats
    });

    return NextResponse.json(movements, { status: 200 });
  } catch (error) {
    console.error("Error fetching movements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});
