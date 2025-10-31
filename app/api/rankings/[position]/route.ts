import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/models/Player";
import { calculateRankingScore } from "@/app/lib/rankingCalculator";

export async function GET(
  request: Request,
  context: { params: Promise<{ position: string }> } // 👈 params is a Promise in Next.js 15+
) {
  const { position } = await context.params; // ✅ unwrap the params with await

  await connectDB();

  const players = await Player.find({ position });
  const ranked = players.map((p) => ({
    _id: p._id,
    name: p.name,
    position: p.position,
    score: calculateRankingScore(p),
  }));

  const sorted = ranked.sort((a, b) => b.score - a.score);

  return NextResponse.json(sorted);
}
