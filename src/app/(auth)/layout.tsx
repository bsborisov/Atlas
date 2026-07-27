export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="h-screen overflow-y-scroll py-6 px-4 md:pt-22 md:px-4 md:pb-6 bg-background-black">
      <div className="my-0 mx-auto max-w-140 opacity-100 transition-opacity duration-500 ease-out">
        <div className="relative rounded-sm overflow-hidden min-h-64 py-2 px-0 bg-background-forms">
          {children}
        </div>
      </div>
    </div>
  );
}