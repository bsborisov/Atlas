const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "AI Workspace",
    href: "/ai",
  },
];


export function Sidebar() {
  return (
    <aside className="w-64 border-r">

      <div className="p-6 text-xl font-bold">
        Atlas
      </div>

      <nav>
        {navigation.map(item => (
          <a
            key={item.href}
            href={item.href}
          >
            {item.name}
          </a>
        ))}
      </nav>

    </aside>
  );
}