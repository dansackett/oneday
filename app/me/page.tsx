import { Suspense } from "react";
import { parse, isValid, differenceInCalendarDays, parseISO } from 'date-fns'

import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getShortNameFromProfile } from "@/lib/user";

import {
  getOrCreateTodayEntry,
  getEntriesForMonth,
  getLastCompletedEntry,
} from "@/lib/daily-entries";

import { DailyEntry } from "@/types";

import EmptyMonth from "@/components/entry-list-empty";
import DailyEntryForm from "@/components/daily-entry-form";
import FirstEntryDisplay from "@/components/first-entry-display";
import WelcomeBackDisplay from "@/components/welcome-back-display";
import { EntriesList } from "@/components/entry-list";


/* Duration to wait before showing welcome back message */
const SHOW_WELCOME_BACK_AFTER_DAYS = 7;


/**
 * Get month from search params
 * @param month Month to retrieve entries for
 */
export async function getMonthFromSearchParams(month?: string): Promise<Date> {
  if (!month) {
    return new Date()
  }

  const parsed = parse(month, 'yyyy-MM', new Date())

  if (!isValid(parsed)) {
    return new Date()
  }

  return parsed
}

const TodayEntryOrForm = async ({ searchParams }: { searchParams: { month?: string } }) => {
  const params = await searchParams;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    throw new Error("User not found");
  }

  const today = new Date();
  const profile = await getUserProfile(user);

  // Make sure we always generate an entry for today
  const TodaysEntry: DailyEntry | null = await getOrCreateTodayEntry(user);

  // Check if the user is new or if they are returning after an absence
  const lastCompletedEntry = await getLastCompletedEntry(user);

  if (!lastCompletedEntry) {
    return <FirstEntryDisplay entry={TodaysEntry} name={getShortNameFromProfile(profile)} />
  }

  let daysSinceLastEntry: number | null = null

  if (lastCompletedEntry) {
    daysSinceLastEntry = differenceInCalendarDays(today, lastCompletedEntry.localDate);
  }

  if (daysSinceLastEntry && daysSinceLastEntry > SHOW_WELCOME_BACK_AFTER_DAYS) {
    return <WelcomeBackDisplay entry={TodaysEntry} />
  }

  let thisMonth = today;

  if (params.month) {
    thisMonth = await getMonthFromSearchParams(params.month)
  }

  const MonthsEntries = await getEntriesForMonth(user, thisMonth);

  return (
    (!!TodaysEntry && TodaysEntry.completed) ?
      MonthsEntries.length ?
        <EntriesList entries={MonthsEntries} month={thisMonth} />
      :
        <EmptyMonth month={thisMonth} />
    :
      <DailyEntryForm entry={TodaysEntry} />
  );
}


export default async function Me({ searchParams }: { searchParams: { month?: string } }) {
  return (
    <div className="w-full py-4">
      <Suspense>
        <TodayEntryOrForm searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
