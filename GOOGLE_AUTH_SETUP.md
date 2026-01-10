# Google OAuth Setup für Supabase

## 1. Google Cloud Console konfigurieren

### Schritt 1: Google Cloud Projekt erstellen
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
3. Aktiviere die **Google+ API** (falls nicht bereits aktiv)

### Schritt 2: OAuth 2.0 Credentials erstellen
1. Gehe zu **APIs & Services** → **Credentials**
2. Klicke auf **Create Credentials** → **OAuth client ID**
3. Wähle **Web application** als Application type
4. Konfiguriere die URLs:

#### Authorized JavaScript origins:
```
http://localhost:3000
https://deine-domain.com
```

#### Authorized redirect URIs:
```
https://deine-supabase-url.supabase.co/auth/v1/callback
http://localhost:54321/auth/v1/callback (für lokales Supabase)
```

5. Speichere die **Client ID** und **Client Secret**

## 2. Supabase konfigurieren

### In deinem Supabase Dashboard:

1. Gehe zu **Authentication** → **Providers**
2. Finde **Google** in der Liste
3. Aktiviere den Google Provider
4. Trage ein:
   - **Client ID**: Die Client ID aus Google Cloud Console
   - **Client Secret**: Das Client Secret aus Google Cloud Console
5. Kopiere die **Callback URL** (diese musst du in Google Cloud Console eintragen)
6. Speichern

## 3. Self-hosted Supabase Konfiguration

Falls du self-hosted Supabase verwendest, füge in deiner `.env` Datei hinzu:

```env
# Google OAuth
GOTRUE_EXTERNAL_GOOGLE_ENABLED=true
GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID=deine-google-client-id
GOTRUE_EXTERNAL_GOOGLE_SECRET=dein-google-client-secret
GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI=https://deine-supabase-url/auth/v1/callback
```

Dann restarte deinen Supabase Stack:
```bash
docker-compose down
docker-compose up -d
```

## 4. Testen

1. Starte deinen Next.js Dev Server:
```bash
npm run dev
```

2. Gehe zu `http://localhost:3000/login`
3. Klicke auf "Mit Google anmelden"
4. Wähle dein Google-Konto
5. Nach erfolgreicher Authentifizierung:
   - Wenn deine Email in `ADMIN_EMAILS` ist → Weiterleitung zu `/admin/dashboard`
   - Wenn nicht → Zurück zu `/login` mit Fehlermeldung

## 5. Wichtige Hinweise

### Email-Whitelist
Nur E-Mail-Adressen, die in der `ADMIN_EMAILS` Environment-Variable stehen, haben Admin-Zugriff:

```env
ADMIN_EMAILS=admin@gmail.com,another-admin@gmail.com
```

### Produktions-URLs
Für Production musst du in Google Cloud Console die korrekten URLs eintragen:

**Authorized JavaScript origins:**
```
https://deine-domain.com
```

**Authorized redirect URIs:**
```
https://deine-supabase-url.supabase.co/auth/v1/callback
```

### Callback Flow
1. User klickt "Mit Google anmelden"
2. Weiterleitung zu Google OAuth
3. User authentifiziert sich
4. Google leitet zurück zu Supabase Callback URL
5. Supabase leitet weiter zu `/auth/callback` (Next.js Route)
6. Email-Whitelist Check
7. Weiterleitung zu Dashboard oder Login

## 6. Troubleshooting

### "redirect_uri_mismatch" Fehler
**Problem:** Die Callback URL stimmt nicht überein

**Lösung:**
- Prüfe, ob die Redirect URI in Google Cloud Console korrekt ist
- Format: `https://deine-supabase-url.supabase.co/auth/v1/callback`
- Achte auf trailing slashes (keine!)

### "Keine Admin-Berechtigung"
**Problem:** Email ist nicht in Whitelist

**Lösung:**
- Füge die Google-Email zu `ADMIN_EMAILS` in `.env.local` hinzu
- Server neu starten nach Änderung der ENV-Variable

### Session wird nicht gesetzt
**Problem:** Cookies werden nicht gespeichert

**Lösung:**
- Prüfe ob `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` korrekt sind
- Lösche Browser-Cookies und versuche es erneut

## 7. Sicherheit

- ✅ Nur Emails in `ADMIN_EMAILS` erhalten Zugriff
- ✅ OAuth-Token werden sicher von Supabase verwaltet
- ✅ Session-Cookies sind httpOnly und secure (in Production)
- ✅ Middleware schützt alle `/admin/*` Routen

## 8. Weitere Provider hinzufügen

Das gleiche Prinzip funktioniert auch für:
- GitHub
- GitLab
- Facebook
- Apple
- Azure
- etc.

Aktiviere einfach den Provider in Supabase und füge den entsprechenden Button in der Login-Seite hinzu!
