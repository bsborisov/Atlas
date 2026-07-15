
import { Header } from "../../features/dashboard/components/Header";
import { Sidebar } from "../../features/dashboard/components/Sidebar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="flex-1 p-6 items-center justify-center">
          {children}
        </main>

      </div>

    </div>
  );
}