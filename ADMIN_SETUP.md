# Admin Panel Setup Anleitung

## 1. Environment-Variablen konfigurieren

Erstelle eine `.env.local` Datei im Root-Verzeichnis:

```env
# Supabase Configuration (Self-hosted)
NEXT_PUBLIC_SUPABASE_URL=https://deine-supabase-url.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-supabase-anon-key

# Admin Email Whitelist (kommagetrennt)
ADMIN_EMAILS=admin@example.com,weiterer-admin@example.com
```

### Wo finde ich die Supabase Credentials?

- **NEXT_PUBLIC_SUPABASE_URL**: Die URL deiner self-hosted Supabase-Instanz
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Der Anon/Public Key aus deinem Supabase-Projekt
- **ADMIN_EMAILS**: Liste der E-Mail-Adressen, die Admin-Zugriff haben sollen

## 2. Packages wurden bereits installiert

Die benötigten Supabase-Packages wurden bereits installiert:
- `@supabase/supabase-js`
- `@supabase/ssr`

## 3. Admin-Benutzer in Supabase erstellen

Gehe in dein Supabase Dashboard:

1. **Authentication** → **Users** → **Add user**
2. Erstelle einen Benutzer mit E-Mail und Passwort
3. Die E-Mail-Adresse muss in `ADMIN_EMAILS` in der `.env.local` stehen

## 4. Datenbankstruktur

Das Admin Panel nutzt folgende Tabellen aus deiner Supabase-Datenbank:

### Haupttabellen:
- **meals**: Rezepte mit allen Details
- **ingredients**: Zutaten
- **meal_ingredient**: Verknüpfung zwischen Rezepten und Zutaten

Die Struktur basiert auf deiner `types.ts` Datei.

## 5. Admin Panel verwenden

### Zugriff:
- **Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin/dashboard`

### Features:

#### Dashboard (`/admin/dashboard`)
- Übersicht aller Rezepte
- Anzeige von Name, Kategorie, Schwierigkeit, Zeit
- Button zum Erstellen neuer Rezepte

#### Neues Rezept (`/admin/recipes/new`)
**Basisdaten:**
- Name, Beschreibung, Kategorie
- Schwierigkeit, Zeit, Portionsgröße
- Bild-URL

**Zubereitungsschritte:**
- Dynamische Liste von Schritten
- Hinzufügen/Entfernen von Schritten

**Zutaten:**
- Suche in der `ingredients` Tabelle
- Menge und Einheit für jede Zutat
- Speichert Verknüpfung in `meal_ingredient`

**Nährwerte (optional):**
- Kalorien, Kohlenhydrate, Fett, Protein
- Natrium, Zucker, Energie

#### Zutaten verwalten (`/admin/ingredients`)
- Liste aller Zutaten
- Neue Zutaten hinzufügen
- **Hinweis**: `ai_keywords` muss nicht ausgefüllt werden

## 6. Sicherheit

### Middleware-Schutz
Alle `/admin/*` Routen sind geschützt durch:
1. **Supabase Auth**: Benutzer muss eingeloggt sein
2. **Email Whitelist**: E-Mail muss in `ADMIN_EMAILS` sein

### Nicht geschützt:
- `/admin/login` - Login-Seite ist öffentlich

## 7. Entwicklung starten

```bash
npm run dev
```

Dann öffne: `http://localhost:3000/admin/login`

## 8. Troubleshooting

### Problem: "Keine Admin-Berechtigung"
**Lösung**: Prüfe ob die E-Mail des Benutzers in `ADMIN_EMAILS` steht

### Problem: "Supabase connection error"
**Lösung**: 
- Prüfe `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Stelle sicher, dass deine Supabase-Instanz erreichbar ist

### Problem: "Cannot find module 'types'"
**Lösung**: Die `types.ts` Datei muss im Root-Verzeichnis liegen

## 9. Datenbankstruktur im Detail

### Rezept erstellen - Ablauf:
1. Insert in `meals` Tabelle
2. Für jede ausgewählte Zutat: Insert in `meal_ingredient` mit `mealid`, `ingredientid`, `quantity`, `unit`

### Beispiel meal_ingredient Eintrag:
```json
{
  "mealid": 1,
  "ingredientid": 5,
  "quantity": 200,
  "unit": "g"
}
```

## 10. Nächste Schritte

- [ ] `.env.local` erstellen und Credentials eintragen
- [ ] Admin-Benutzer in Supabase erstellen
- [ ] E-Mail zu `ADMIN_EMAILS` hinzufügen
- [ ] Server starten und zu `/admin/login` navigieren
- [ ] Erste Zutaten hinzufügen
- [ ] Erstes Rezept erstellen
