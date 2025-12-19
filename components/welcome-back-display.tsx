import { cn } from "@/lib/utils";
import { lora, poppins } from "@/lib/fonts";
import { DailyEntry } from "@/types";

import EntryRevisitBtn from "./entry-revisit-btn";


export default function WelcomeBackDisplay({ entry }: { entry: DailyEntry | null }) {
  return (
    <section className="space-y-10 animate-fade-in">
      <h1 className={cn(lora.className, "text-4xl weight-500 text-slate-950 mb-1")}>
        Welcome back
      </h1>

      <p className={cn(poppins.className, "text-slate-600 !text-lg !leading-8")}>
        Pick up wherever today finds you.
      </p>

      <EntryRevisitBtn entry={entry} isFirstEntry={true} />
    </section>
  )
}

