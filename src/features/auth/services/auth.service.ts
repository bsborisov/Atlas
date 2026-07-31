import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword
} from "@/lib/password";
import { UserDto } from "../types/user.dto";

export async function registerUser(
  data: {
    name: string;
    email: string;
    password: string;
  }
): Promise<UserDto> {

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });


  if (existingUser)
    throw new Error("User already exists");


  const passwordHash = await hashPassword(data.password);

  const user =
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      }
    });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };

}

export async function loginUser(
  email: string,
  password: string
): Promise<UserDto> {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user?.passwordHash) {
    throw new Error("Invalid credentials");
  }

  const valid = await verifyPassword(
    password,
    user.passwordHash
  );

  if (!valid)
    throw new Error("Invalid credentials");

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image
  };

}