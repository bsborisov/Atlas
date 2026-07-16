
import { Header } from "./Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-primary-dash-gradient ">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="flex-1 px-6 py-8 items-center justify-center overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}