import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Tags the public pages register via cacheTag(). Only these may be revalidated.
const ALLOWED_TAGS = new Set(["members"]);

/**
 * Token-guarded on-demand revalidation.
 *
 * Members are edited directly in the database (no in-app admin flow), so the
 * public pages' `"use cache"` entries don't get invalidated automatically.
 * After editing, POST here to refresh them:
 *
 *   curl -X POST "$SITE/api/revalidate?tag=members" \
 *        -H "Authorization: Bearer $REVALIDATE_SECRET"
 *
 * `tag` defaults to "members". Uses immediate expiry so the next page load
 * serves fresh data rather than stale-while-revalidate.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  const auth = request.headers.get("authorization");
  const provided =
    auth?.startsWith("Bearer ") ? auth.slice(7) : request.nextUrl.searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag") ?? "members";
  if (!ALLOWED_TAGS.has(tag)) {
    return NextResponse.json({ error: `Unknown tag: ${tag}` }, { status: 400 });
  }

  revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
