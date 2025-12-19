import { Suspense } from "react";
import { parse } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { createClient } from "@/lib/supabase/server";
import { getEntryForDate } from "@/lib/daily-entries";
import { DailyEntry } from "@/types";

import DailyEntryForm from "@/components/daily-entry-form";
import DailyEntryDisplay from "@/components/entry-display";


const EntryViewOrForm = async ({ params }: { params: { date: string } }) => {
  const thisParams = await params;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const today = new Date();
  const thisDay = parse(thisParams.date, 'yyyy-MM-dd', new Date());

  const thisEntry: DailyEntry | null = await getEntryForDate(user, thisDay);

  const timezone = thisEntry?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isThisToday = formatInTimeZone(thisDay, timezone, 'yyyy-MM-dd') === formatInTimeZone(today, timezone, 'yyyy-MM-dd');

  if (!thisEntry) {
    throw new Error("Entry not found");
  }

  return (
    (!isThisToday) ?
      <DailyEntryDisplay entry={thisEntry} />
    :
      <DailyEntryForm entry={thisEntry} />
  );
}


export default async function DateView({ params }: { params: { date: string } }) {
  return (
    <div className="w-full py-4">
      <Suspense>
        <EntryViewOrForm params={params} />
      </Suspense>
    </div>
  );
}
