import { NextResponse } from "next/server";
import prisma from "@/prisma";

interface ParamsProps {
  userId: string;
}

export async function GET(req: Request, { params }: { params: ParamsProps }) {
  const { userId } = params; // Récupérer l'ID de l'utilisateur depuis l'URL

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50"); // Valeur par défaut = 50

  try {
    const movements = await prisma.movements.findMany({
      where: {
        user_id: Number(userId), // Filtrer par l'ID de l'utilisateur
      },
      orderBy: {
        movement_at: "desc", // Trier par 'movement_at' en ordre décroissant
      },
      take: limit, // Limiter le nombre de résultats
    });

    return NextResponse.json(movements, { status: 200 });
  } catch (error) {
    console.log(error);

    console.error("Error fetching movements for user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
