"use client";

import { zIndex } from "@/config/themeSettings";
import LoadingDots from "../ui/LoadingDots";

export default function PageLoading() {
  return (
    <div className={`m-6 z-[${zIndex.floaters}]`}>
      <LoadingDots />
    </div>
  );
}