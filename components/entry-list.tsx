import {
  addMonths,
  subMonths,
  format,
  isAfter,
  startOfMonth,
} from 'date-fns'

import { cn } from "@/lib/utils";
import { lora, poppins } from "@/lib/fonts";
import { DailyEntry } from '@/types'

import EntryRevisitBtn from "./entry-revisit-btn";


export function MonthHeader({ month }: { month: Date }) {
  return (
    <h1 className={cn(lora.className, "text-4xl weight-500 text-slate-950 mb-1")}>
      {format(month, 'MMMM yyyy')}
    </h1>
  )
}

function EntryRow({ entry }: { entry: DailyEntry }) {
  const preview = entry.good || entry.heavy || entry.nextStep;

  return (
    <div className="space-y-2 animate-fade-in">
      <div className={cn("text-sm font-bold text-slate-800", poppins.className)}>
        { format(entry.localDate, 'EEEE, LLLL do') }
      </div>

      <div className={cn(poppins.className, "text-slate-600 !text-lg !leading-8 line-clamp-2")}>
        {preview}
      </div>

      <EntryRevisitBtn entry={entry} isFirstEntry={false} />
    </div>
  )
}

function Entries({ entries }: { entries: DailyEntry[] }) {
  return (
    <div className="space-y-10">
      {entries.map((entry) => (
        <EntryRow key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export function MonthPagination({ month }: { month: Date }) {
  const isFuture = isAfter(startOfMonth(addMonths(month, 1)), startOfMonth(new Date()));

  return (
    <div className="flex justify-between pt-16 text-sm text-slate-800">
      <a
        href={`/me?month=${format(subMonths(month, 1), 'yyyy-MM')}`}
        className="hover:text-slate-950"
      >
        ← {format(subMonths(month, 1), 'MMMM')}
      </a>

      {
        !isFuture &&
          <a
            href={`/me?month=${format(addMonths(month, 1), 'yyyy-MM')}`}
            className="hover:text-slate-950"
          >
            {format(addMonths(month, 1), 'MMMM')} →
          </a>
      }
    </div>
  )
}

export function EntriesList({
  entries,
  month
}: {
  entries: DailyEntry[]
  month: Date
}) {
  if (!entries.length) {
    return (
      <p className="text-sm text-neutral-400">
        Nothing written this month.
      </p>
    )
  }

  return (
    <section className="space-y-10">
      <MonthHeader month={month} />
      <Entries entries={entries} />
      <MonthPagination month={month} />
    </section>
  )
}

