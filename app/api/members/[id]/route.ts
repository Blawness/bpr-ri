import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await db
      .select()
      .from(members)
      .where(eq(members.id, id))
      .limit(1);

    if (data.length === 0) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Failed to fetch member:", error);
    return NextResponse.json({ error: "Failed to fetch member" }, { status: 500 });
  }
}
