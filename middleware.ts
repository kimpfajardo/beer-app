import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && req.nextUrl.pathname !== "/auth") {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.delete("filter");
    return NextResponse.redirect(url);
  }

  if (
    session &&
    (req.nextUrl.pathname === "/auth" || req.nextUrl.pathname === "/")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/beer-gallery";
    url.searchParams.set("filter", "all");
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/auth",
    "/beer-gallery",
    "/beer-details/:id",
    "/profile",
    "/shopping-list",
  ],
};
