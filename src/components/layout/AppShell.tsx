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
        <main className="flex-1 px-6 py-8 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}