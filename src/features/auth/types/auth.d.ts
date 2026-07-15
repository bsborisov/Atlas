export type AuthUser = {
    name: string | null;
    email: string;
    id: string;
    passwordHash: string;
    createdAt: Date;
};