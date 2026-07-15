import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function createSession(
  userId: string
) {

  const token =
    crypto.randomBytes(32)
      .toString("hex");


  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt:
        new Date(
          Date.now()
          +
          1000 * 60 * 60 * 24 * 7 //7days
        )
    }
  });

  return token;

}

export async function getSessionUser() {

  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }


  const session =
    await prisma.session.findUnique({

      where: {
        token
      },

      include: {
        user: true
      }

    });


  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {

    await prisma.session.delete({
      where: {
        id: session.id
      }
    });

    return null;
  }

  return session.user;
}

export async function destroySession() {

  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (token) {

    await prisma.session.deleteMany({
      where: {
        token
      }
    });

  }

  cookieStore.delete("session");
}