'use client';

import { redirect } from "next/navigation";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { DailyEntry } from '@/types'

export default function EntryRevisitBtn({ entry, isFirstEntry = false }: { entry: DailyEntry | null, isFirstEntry: boolean }) {
  if (!entry) {
    return null;
  }

  const today = new Date();
  const timezone = entry.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isThisToday = formatInTimeZone(entry.localDate, timezone, 'yyyy-MM-dd') === formatInTimeZone(today, timezone, 'yyyy-MM-dd');

  return (
    <div className="!mt-4">
      <button
        type="button"
        tabIndex={0}
        className="cursor-pointer text-slate-800 text-sm transition"
        onClick={() => redirect(`/me/${format(entry.localDate, 'yyyy-MM-dd')}`)}
      >
        {
          isFirstEntry ?
            "Get started →"
          : isThisToday ?
            "You can continue writing →"
          :
            "Revisit →"
        }
      </button>
    </div>
  );
}
