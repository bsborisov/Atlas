import Link from "next/link";
import { DashboardNavCardType } from "../../../features/dashboard/types/dashboard";
import clsx from "clsx";

const SidebarNavCard = ({ item, active = false }: DashboardNavCardType) => {

  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        className={clsx(
          "flex flex-row w-full px-[14px] py-[10px] rounded-sm items-center justify-start whitespace-nowrap hover:bg-background-nav-hover",
          {
            "bg-background-nav-active": active,
          }
        )}
      >
        <Icon className="mr-4" />
        <p className="text-sm m-0 leading-6 relative h-auto whitespace-nowrap">
          {item.title}
        </p>
      </Link>
    </li>
  );
}

export default SidebarNavCard