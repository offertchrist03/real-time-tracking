import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50"); // Valeur par défaut = 50

  try {
    const { rows } = await pool.query(
      "SELECT * FROM movements ORDER BY movement_at DESC LIMIT $1",
      [limit]
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching movements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
