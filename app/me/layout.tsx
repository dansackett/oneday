import { Suspense } from "react";

import Logo from "@/components/logo";
import { AuthButton } from "@/components/auth-button";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-200">
      <nav className="flex flex-col items-center w-full flex justify-center border-b border-b-slate-300 bg-slate-100 shadow-sm h-16 animate-fade-in">
        <div className="w-1/2 flex justify-between items-center py-3 text-sm">
          <Logo />

          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>

      <div className="w-1/2 mx-auto pt-36">
        {children}
      </div>
    </main>
  );
}
