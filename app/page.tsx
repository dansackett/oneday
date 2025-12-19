import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { AuthButton } from "@/components/auth-button";
import { lora, poppins } from "@/lib/fonts";


export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-200 flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-xl text-center space-y-12">

          <h1 className={cn("text-3xl sm:text-4xl font-medium text-slate-950 opacity-0 animate-fade-in [animation-delay:100ms]", lora.className)}>
            One day at a time.
          </h1>

          <p className={cn("text-base text-slate-600 leading-relaxed opacity-0 animate-fade-in [animation-delay:250ms]", poppins.className)}>
            A quiet place to reflect, notice small wins,
            <br />
            and take life as it comes.
          </p>

          <p className={cn("text-sm text-slate-500 opacity-0 animate-fade-in [animation-delay:400ms]", poppins.className)}>
            If this feels like something you could use,
            <br />
            you’re welcome here.
          </p>

          <Suspense>
            <AuthButton className="opacity-0 animate-fade-in [animation-delay:550ms]" />
          </Suspense>
        </div>
      </section>
      
      <footer className={cn("pb-6 text-center text-xs text-slate-400 opacity-0 animate-fade-in [animation-delay:550ms]", poppins.className)}>
        No streaks. No scores. No expectations.
      </footer>
    </main>
  )
}

