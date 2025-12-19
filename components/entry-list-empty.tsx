import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

import { MonthPagination, MonthHeader } from './entry-list'


export default function EmptyMonth({ month }: { month: Date }) {
  return (
    <section className="space-y-10 animate-fade-in">
      <MonthHeader month={month} />

      <p className={cn(poppins.className, "text-slate-600 !text-lg !leading-8")}>
        Nothing written this month.
        <br />
        Some days are just lived and not recorded.
      </p>

      <MonthPagination month={month} />
    </section>
  )
}
