import { AtlasLogo } from "@/components/shared/AtlasLogo";
import { Text } from "@/components/ui/Text";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen relative py-10 px-6 self-stretch items-center justify-center bg-atlas-background">
      <div className="flex flex-col w-full justify-center items-center">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[50%] w-175 h-125 background-gradient-auth"></div>
          <svg width="100%" height="100%" className="absolute opacity-2 inset-0">
            <defs><pattern id="adot" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#adot)" />
          </svg>
        </div>
        <Link
          href={"/"}
          className="absolute top-6 left-7 flex items-center gap-[7px] text-main-text text-[13px] hover:text-main-text-active"
        >
          <ArrowLeft size={14} /> Back
        </Link>

        <div className="flex relative mb-9 gap-[9px] items-center">
          <AtlasLogo />
          <Text className="text-base font-bold text-atlas-foreground tracking-[-0.02em]">Atlas</Text>
        </div>
        {children}
      </div>
    </div>
  );
}