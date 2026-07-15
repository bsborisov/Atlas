import { AppShell } from "@/components/layout/AppShell";
import { getSessionUser } from "@/features/auth/session";
import { AuthProvider } from "@/providers/AuthProvider";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }


  return (
    <AuthProvider user={user}>
      <AppShell>
        {children}
      </AppShell>
    </AuthProvider>
  );
}