"use client";

import { UserDto } from "@/features/auth/types/user.dto";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<UserDto | null>(null)

export const AuthProvider = ({
  children,
  user
}: {
  children: ReactNode,
  user: UserDto
}) => {

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const user = useContext(AuthContext);

  if (user === null) {
    throw new Error(
      "useAuth must be used within AuthProvider."
    );
  }

  return user;
}