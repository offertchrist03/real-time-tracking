import { NextResponse } from "next/server";
import pool from "@/lib/db";

interface ParamsProps {
  userId: number;
}

export async function GET(req: Request, { params }: { params: ParamsProps }) {
  const { userId } = params; // Récupérer l'ID de l'utilisateur depuis l'URL

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50"); // Valeur par défaut = 50

  try {
    const { rows } = await pool.query(
      "SELECT * FROM movements WHERE user_id = $1 ORDER BY movement_at DESC LIMIT $2",
      [userId, limit]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching movements for user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
