"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-[100svh] bg-black text-white flex items-center justify-center">
        <p>Lädt...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
