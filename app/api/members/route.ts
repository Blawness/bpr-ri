import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db
      .select()
      .from(members)
      .where(eq(members.isActive, true))
      .orderBy(asc(members.sortOrder), asc(members.name));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}
