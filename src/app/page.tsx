
import { getSessionUser } from "@/features/auth/session";
import { MainLanding, TopBar } from "@/features/marketing";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="h-dvb flex flex-col overflow-hidden font-montserrat bg-black">
      <div className="block z-2">
        <TopBar />
      </div>
      <div className="overflow-hidden z-1">
        <div className="flex flex-col h-full relative overflow-visible">
          <div className="h-full isolate overflow-auto">
            <MainLanding />
          </div>
        </div>
      </div>
    </div>
  );
}