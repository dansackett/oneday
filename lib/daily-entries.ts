'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache'
import { startOfMonth, endOfMonth, startOfDay, format } from 'date-fns'
import { JwtPayload } from "@supabase/supabase-js";
import { DailyEntry, DailyEntryInput } from "@/types";

/**
 * Retrieves or creates a daily entry for today
 * @param user Supabase user
 */
export async function getOrCreateTodayEntry(user: JwtPayload | undefined): Promise<DailyEntry | null> {
  const today = startOfDay(new Date());
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

  console.log({ today, timeZone });

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.dailyEntry.upsert({
    where: {
      userId_localDate: {
        localDate: today,
        userId: user?.sub,
      },
    },
    create: {
      localDate: today,
      userId: user?.sub,
      timezone: timeZone,
    },
    update: {},
  });
}

/**
 * Retrieves a daily entry for a specific date
 * @param user Supabase user
 * @param date Date to retrieve entries for
 */
export async function getEntryForDate(user: JwtPayload | undefined, date: Date): Promise<DailyEntry | null> {
  if (!user) {
    throw new Error("User not found");
  }

  const entry = await prisma.dailyEntry.findFirst({
    where: {
      userId: user?.sub,
      localDate: startOfDay(date),
    }
  })

  return entry
}

/**
 * Updates a daily entry
 * @param entryId Daily entry id
 * @param entry Daily entry data
 */
export async function updateDailyEntry(entryId: string | null | undefined, entry: DailyEntryInput): Promise<void> {
  if (!entryId) {
    throw new Error("Entry id not found");
  }

  try {
    await prisma.dailyEntry.update({
      where: {
        id: entryId,
      },
      data: entry,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Marks a daily entry as completed
 * @param entryId Daily entry id
 */
export async function markEntryCompleted(entryId: string | null | undefined): Promise<void> {
  if (!entryId) {
    throw new Error("Entry id not found");
  }

  await prisma.dailyEntry.update({
    where: { id: entryId },
    data: { completed: true }
  })

  revalidatePath('/me')
}

/**
 * Retrieves daily entries for a month
 * @param userId User id
 * @param month Month to retrieve entries for
 */
export async function getEntriesForMonth(user: JwtPayload | undefined, month: Date) {
  const { start, end } = {
    start: startOfMonth(month),
    end: endOfMonth(month),
  }

  if (!user) {
    throw new Error("User not found");
  }

  const entries = await prisma.dailyEntry.findMany({
    where: {
      userId: user?.sub,
      completed: true,
      localDate: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      localDate: 'desc',
    },
  })

  return entries.filter((entry: DailyEntry) => {
    return !!(entry.heavy || entry.good || entry.nextStep);
  });
}

/**
 * Groups daily entries by month
 * @param entries Daily entries
 */
export async function groupEntriesByMonth(entries: DailyEntry[]) {
  return entries.reduce((acc, entry) => {
    const key = format(entry.localDate, 'yyyy-MM')

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(entry)

    return acc
  }, {} as Record<string, typeof entries>)
}

/**
 * Retrieves the last completed entry
 * @param user Supabase user
 */
export async function getLastCompletedEntry(user: JwtPayload | undefined): Promise<DailyEntry | null> {
  if (!user) {
    throw new Error("User not found");
  }

  const entry = await prisma.dailyEntry.findFirst({
    where: {
      userId: user?.sub,
      completed: true,
      localDate: {
        lt: new Date(),
      }
    },
  });

  return entry;
}
