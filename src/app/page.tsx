
import { getSessionUser } from "@/features/auth/session";
import { MainLanding, TopBar } from "@/features/marketing";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full bg-atlas-background text-atlas-foreground">
      <TopBar />
      <MainLanding />
    </div>
  );
}