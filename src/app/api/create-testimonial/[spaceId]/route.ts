import prisma from "@/lib/prisma";
import { testimonialSchema } from "@/schemas/trustimonial";
import { Testimonials } from "@/types/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { spaceId: string } }
) {
  const { userId } = await auth();
  const { spaceId } = params;

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  if (!spaceId) {
    return Response.json(
      {
        success: false,
        message: "SpaceId Not provided in params",
      },
      { status: 400 }
    );
  }

  try {
    // check if the space is accepting testimonials
    const space = await prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      return Response.json(
        {
          success: false,
          message: "Space Not found | Invalid Space Id",
        },
        { status: 404 }
      );
    }

    if (!space?.status) {
      return Response.json(
        {
          success: false,
          message: "Space Owner is no longer accepting Testimonials",
        },
        { status: 400 }
      );
    }

    const data: Testimonials = await req.json();
    const response = testimonialSchema.safeParse(data);

    if (!response.success) {
      const errors = response.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      }));
      return Response.json(
        {
          success: false,
          message: "Invalid request",
          errors,
        },
        { status: 400 }
      );
    }

    const { ...validatedData } = response.data;
    const newTestimonial = await prisma.testimonials.create({
      data: {
        spaceId: spaceId,
        ...validatedData,
      },
    });

    if (!newTestimonial) {
      return Response.json(
        {
          success: false,
          message: "Failed to create Testimonial",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Testimonial created Successfully !!!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Testimonial", error);
    return Response.json(
      {
        success: false,
        message: "Failed to create Testimonial",
      },
      { status: 500 }
    );
  }
}
