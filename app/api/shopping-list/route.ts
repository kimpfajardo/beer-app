import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({
    cookies,
  });

  const { data, error } = await supabase.from("shopping_list").select();

  return NextResponse.json(data, { status: 200 });
}

export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({
    cookies,
  });
  const body = request.body as unknown as {
    list_id: string;
    beer_id: string;
  };

  const { data } = await supabase
    .from("beers")
    .update(request.body)
    .match({ list_id: body.list_id, beer_id: body?.beer_id });

  return NextResponse.json(data, { status: 204 });
}
