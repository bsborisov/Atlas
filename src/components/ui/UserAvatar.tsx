"use client";

import { UserDto } from "@/features/auth/types/user.dto";
import { cn, getInitials } from "@/lib/utils"
import Image from "next/image";

const UserAvatar = ({
  user,
  className = ""
}: {
  user: UserDto;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `flex shrink-0 w-7 h-7`,
        !user.image ? `text-xs font-bold text-atlas-foreground items-center justify-center rounded-lg user-icon-fallback-gradient` : ``,
        className
      )}>
      {
        user?.image
          ? <Image
            width={28}
            height={28}
            src={user?.image}
            alt={user?.name}
            className="rounded-lg"
          />
          : getInitials(user?.name)
      }
    </div>
  )
}

export default UserAvatar;