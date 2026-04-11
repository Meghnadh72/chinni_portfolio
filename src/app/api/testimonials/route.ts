import { NextResponse } from "next/server";
import { getAllTestimonials } from "@/lib/data";

export async function GET() {
  const testimonials = await getAllTestimonials();
  return NextResponse.json(testimonials);
}
