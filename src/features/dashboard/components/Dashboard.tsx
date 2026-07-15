"use client";

import { logoutAction } from "@/features/auth/actions/auth";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

export function Dashboard({
  stats
}: {
  stats: any
}) {

  const user = useAuth();

  const logoutHandler = () => {
    //probably some analytics tracking
    logoutAction()
  }

  return (
    <div>
      <main>
        <h1>Hello, {user?.name}</h1>
        {stats}
        <Button onClick={logoutHandler}>Logout</Button>
      </main>
    </div>
  )

}