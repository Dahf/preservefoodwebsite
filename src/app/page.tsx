"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100svh] bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
          <p className="text-slate-600">Lädt...</p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
