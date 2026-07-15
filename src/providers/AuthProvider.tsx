"use client";

import { AuthUser } from "@/features/auth/types/auth";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<AuthUser | null>(null)

export const AuthProvider = ({
    children, 
    user
}:{
    children: ReactNode, 
    user: AuthUser
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