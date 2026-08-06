import { Header } from "./Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-atlas-background-inner">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="w-full h-full overflow-y-auto bg-atlas-background">
          {children}
        </main>
      </div>
    </div>
  );
}