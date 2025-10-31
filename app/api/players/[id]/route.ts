import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import { Player } from "@/app/models/Player";

// ✅ GET Player by ID
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();

  const player = await Player.findById(id);
  if (!player) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(player);
}

// ✏️ UPDATE Player by ID (PATCH)
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();

  const data = await req.json();
  const updatedPlayer = await Player.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedPlayer) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json(updatedPlayer);
}

// 🗑️ DELETE Player by ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();

  const deletedPlayer = await Player.findByIdAndDelete(id);
  if (!deletedPlayer) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Player deleted successfully" });
}
