import type { User } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

type GoogleIdentity = {
  googleSubject: string;
  email: string;
  name: string;
  image: string | null;
};

export class GoogleAccountConflictError extends Error {
  constructor() {
    super(
      "An account already exists with this email. " +
      "Sign in with your password before linking Google.",
    );

    this.name = "GoogleAccountConflictError";
  }
}

export async function resolveGoogleUser({
  googleSubject,
  email,
  name,
  image,
}: GoogleIdentity): Promise<User> {
  return prisma.$transaction(async (transaction) => {
    const existingAccount =
      await transaction.oAuthAccount.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: googleSubject,
          },
        },
        include: {
          user: true,
        },
      });

    if (existingAccount) {
      return existingAccount.user;
    }

    const existingUser =
      await transaction.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        throw new GoogleAccountConflictError();
      }

      await transaction.oAuthAccount.create({
        data: {
          provider: "google",
          providerAccountId: googleSubject,
          userId: existingUser.id,
        },
      });

      return transaction.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          image: existingUser.image ?? image,
        },
      });
    }

    return transaction.user.create({
      data: {
        email,
        name,
        image,
        emailVerified: new Date(),
        passwordHash: null,

        accounts: {
          create: {
            provider: "google",
            providerAccountId: googleSubject,
          },
        },
      },
    });
  });
}