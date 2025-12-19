import { formatInTimeZone } from "date-fns-tz";

import { DailyEntry } from "@/types";

import { cn } from "@/lib/utils";
import { lora, poppins } from "@/lib/fonts";

import BackBtn from "./entry-display-back-btn";


interface DailyEntryDisplayProps {
  className?: string;
  entry: DailyEntry | null;
}


function EntryField({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) {
    return null;
  }

  return (
    <div className="mb-10 animate-fade-in">
      <div className={cn(lora.className, "text-4xl weight-500 text-slate-950 mb-1")}>
        { label }
      </div>

      <div className={cn(poppins.className, "text-slate-600 w-full !text-lg py-3 px-0 resize-none bg-transparent border-none focus-visible:outline-none focus-visible:ring-0 !outline-none ring-0 focus:ring-0 focus:outline-none !leading-8 selection:bg-neutral-200")}>
        { value }
      </div>
    </div>
  );
}
        

export default function DailyEntryDisplay({ className, entry }: DailyEntryDisplayProps) {
  const fields = [
    {
      label: "What is weighing on you?",
      value: entry?.heavy,
    },
    {
      label: "What went well?",
      value: entry?.good,
    },
    {
      label: "What is your next small step?",
      value: entry?.nextStep,
    },
  ];

  const thisDate = entry?.localDate || new Date();
  const timezone = entry?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = formatInTimeZone(thisDate, timezone, 'EEEE, LLLL do yyyy');

  return (
    <div className={cn("mt-2 w-full", className)}>
      <div className="flex shrink-0 items-center justify-between mb-2">
        <div className={cn("text-sm font-light text-slate-800 animate-fade-in", poppins.className)}>
          { today }
        </div>
      </div>

      {
        fields.map(({ label, value }) => (
          <EntryField key={label} label={label} value={value} />
        ))
      }

      <BackBtn />
    </div>
  );
}
