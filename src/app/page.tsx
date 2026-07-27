
import { getSessionUser } from "@/features/auth/session";
import { MainLanding, TopBar } from "@/features/marketing";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col w-full items-start font-inter">
      <div className="flex flex-col w-full items-start shrink-0 bg-atlas-background">
        <div className="flex flex-col items-start self-stretch">
          <TopBar />
          <MainLanding />
        </div>
      </div>
    </div>
  );
}