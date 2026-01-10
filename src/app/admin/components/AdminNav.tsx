"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin/dashboard"
              className="text-xl font-bold text-slate-900"
            >
              Preserve Food Admin
            </Link>
            <div className="flex gap-4">
              <Link
                href="/admin/dashboard"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/recipes/new"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Neues Rezept
              </Link>
              <Link
                href="/admin/ingredients"
                className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Zutaten
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{userEmail}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-slate-300 hover:bg-slate-50"
            >
              Abmelden
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
