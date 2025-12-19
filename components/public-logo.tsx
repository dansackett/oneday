import Link from "next/link";

import { cn } from "@/lib/utils";

export default function PublicLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-5 items-center font-bold text-slate-950", className)}>
      <Link href={"/"}>ONE DAY</Link>
    </div>
  );
}
