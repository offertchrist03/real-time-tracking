import { NextResponse } from "next/server";
import pool from "@/lib/db";

interface ParamsProps {
  userId: number;
}

export async function GET(req: Request, { params }: { params: ParamsProps }) {
  const { userId } = params; // Récupérer l'ID de l'utilisateur depuis l'URL

  try {
    const { rows } = await pool.query(
      "SELECT id, name FROM users WHERE user_id = $1",
      [userId]
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
