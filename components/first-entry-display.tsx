import { cn } from "@/lib/utils";
import { lora, poppins } from "@/lib/fonts";
import { DailyEntry } from "@/types";

import EntryRevisitBtn from "./entry-revisit-btn";


export default function FirstEntryDisplay({ entry, name }: { entry: DailyEntry | null, name: string }) {
  return (
    <section className="space-y-10 animate-fade-in">
      <h1 className={cn(lora.className, "text-4xl weight-500 text-slate-950 mb-1")}>
        Welcome { name }
      </h1>

      <p className={cn(poppins.className, "text-slate-600 !text-lg !leading-8")}>
        This is a place to take things one day at a time.
        <br />
        There’s nothing you need to do perfectly here.
      </p>

      <EntryRevisitBtn entry={entry} isFirstEntry={true} />
    </section>
  )
}

