"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <nav className="border-b border-neutral-800 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="text-xl font-bold">
              Preserve Food Admin
            </Link>
            <div className="flex gap-4">
              <Link
                href="/admin/dashboard"
                className="text-neutral-300 hover:text-white transition"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/recipes/new"
                className="text-neutral-300 hover:text-white transition"
              >
                Neues Rezept
              </Link>
              <Link
                href="/admin/ingredients"
                className="text-neutral-300 hover:text-white transition"
              >
                Zutaten
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">{userEmail}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-neutral-700 hover:bg-neutral-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
