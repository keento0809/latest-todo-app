import { NextResponse } from "next/server";

export async function GET() {
  // Create a delay using a Promise
  await new Promise((resolve) => setTimeout(resolve, 4500));

  const text = "Hello ブラボー";

  return NextResponse.json({ text }, { status: 200 });
}
