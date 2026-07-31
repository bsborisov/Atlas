import type { UserDto } from "@/features/auth/types/user.dto";
import { prisma } from "@/lib/prisma";

type OAuthProvider = "google" | "github";

type OAuthIdentity = {
  provider: OAuthProvider;
  providerAccountId: string;
  email: string;
  name: string;
  image: string | null;
};

export class OAuthAccountConflictError
  extends Error {
  constructor() {
    super(
      "An account already exists with this email. Sign in using the original method before linking another provider.",
    );

    this.name = "OAuthAccountConflictError";
  }
}

export async function resolveOAuthUser({
  provider,
  providerAccountId,
  email,
  name,
  image,
}: OAuthIdentity): Promise<UserDto> {
  return prisma.$transaction(
    async (transaction) => {
      const existingAccount =
        await transaction.oAuthAccount.findUnique({
          where: {
            provider_providerAccountId: {
              provider,
              providerAccountId,
            },
          },
          include: {
            user: true,
          },
        });

      if (existingAccount) {
        return {
          id: existingAccount.user.id,
          name: existingAccount.user.name,
          email: existingAccount.user.email,
          image: existingAccount.user.image,
        };
      }

      const existingUser =
        await transaction.user.findUnique({
          where: {
            email,
          },
        });

      if (existingUser) {
        if (!existingUser.emailVerified) {
          throw new OAuthAccountConflictError();
        }

        await transaction.oAuthAccount.create({
          data: {
            provider,
            providerAccountId,
            userId: existingUser.id,
          },
        });

        const updatedUser =
          await transaction.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              image:
                existingUser.image ?? image,
            },
          });

        return {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
        };
      }

      const user =
        await transaction.user.create({
          data: {
            email,
            name,
            image,
            passwordHash: null,
            emailVerified: new Date(),

            accounts: {
              create: {
                provider,
                providerAccountId,
              },
            },
          },
        });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
    },
  );
}