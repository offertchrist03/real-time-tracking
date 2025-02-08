import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { auth } from "@/auth";

export const GET = auth(async (req, res) => {
  if (!req.auth) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20"); // Valeur par défaut = 20

  try {
    const { rows } = await pool.query(
      "SELECT id, name FROM users WHERE role='user' LIMIT $1",
      [limit]
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
});
