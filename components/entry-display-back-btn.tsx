'use client';

import { redirect } from "next/navigation";

export default function BackBtn() {
  return (
    <div className="flex items-center mt-10">
      <div>
        <button
          type="button"
          tabIndex={0}
          className="cursor-pointer text-slate-800 text-sm transition"
          onClick={() => redirect("/me")}
        >
          ← Back to entries
        </button>
      </div>
    </div>
  );
}
