import prisma from "@/lib/prisma";
import { spaceSchema } from "@/schemas/space";
import { Space } from "@/types/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// fn to get userId of db from clerk metadata
async function getDBUserId(userId: string) {
  const user = await (await clerkClient()).users.getUser(userId);
  return user.publicMetadata?.userId as string;
}

//fn to check userId is valid
async function isValidUser(dbUserId: string) {
  return await prisma.user.findUnique({ where: { id: dbUserId } });
}

//fn to generate a unique slug
function generateSlug(name: string) {
  const randomNum = Math.floor(Math.random() * 1000);
  return `${name}${randomNum}`;
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized request" },
      { status: 401 }
    );
  }

  const dbUserId = await getDBUserId(userId);
  const validUser = await isValidUser(dbUserId);

  if (!validUser) {
    return Response.json(
      {
        success: false,
        message: "user not found | Invalid userId",
      },
      { status: 404 }
    );
  }

  try {
    const data: Space = await req.json(); // extract data
    const response = spaceSchema.safeParse(data); // zod validation

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

    const { name, ...validatedData } = response.data;
    const slug = generateSlug(name);

    // create a new space
    const newSpace = await prisma.space.create({
      data: {
        userId: dbUserId,
        name,
        slug,
        ...validatedData,
      },
    });

    if (!newSpace) {
      return Response.json(
        {
          success: false,
          message: "Failed to create space",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Space created Successfully !!!",
        data: {
          slug: newSpace.slug,
          spaceId: newSpace.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating space", error);
    return Response.json(
      {
        success: false,
        message: "Failed to create space",
      },
      { status: 500 }
    );
  }
}
