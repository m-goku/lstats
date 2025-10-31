// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/models/Player";

export async function GET() {
  await connectDB();
  const players = await Player.find();
  return NextResponse.json(players);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const newPlayer = await Player.create(data);
  return NextResponse.json(newPlayer);
}

