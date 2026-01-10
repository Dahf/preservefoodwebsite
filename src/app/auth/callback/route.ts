import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin



  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Prüfe ob Email in Admin-Whitelist ist
      const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
      
      if (data.user.email && adminEmails.includes(data.user.email)) {
        // Admin-Zugriff erlaubt
        return NextResponse.redirect(`${origin}/admin/dashboard`)
      } else {
        // Keine Admin-Berechtigung - ausloggen
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/login?error=unauthorized`)
      }
    }
  }

  // Fehler beim Auth-Flow
  return NextResponse.redirect(`${origin}/login`)
}
