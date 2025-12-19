import Link from "next/link";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton({ className }: { className?: string }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (user) {
    return (
      <div className={cn("flex items-center gap-4 text-slate-950", className)}>
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center gap-8 text-sm", className)}>
      <Link href="/auth/sign-up" className="text-slate-700 hover:text-slate-950 transition">
        Sign up
      </Link>

      <Link href="/auth/login" className="text-slate-700 hover:text-slate-950 transition">
        Log in
      </Link>
    </div>
  );
}
