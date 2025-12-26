import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zum Umgang mit personenbezogenen Daten.",
};

export default function DatenschutzPage() {
  const supportEmail = siteConfig.links.email || "support@calai.app";

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Datenschutz
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            So gehen wir mit deinen Daten um
          </h1>
          <p className="text-lg text-muted-foreground">
            Diese Seite beschreibt, welche Daten wir verarbeiten, zu welchen
            Zwecken das geschieht und welche Rechte du jederzeit ausüben kannst.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-lg border bg-card/60 p-5">
            <h2 className="text-xl font-semibold">Verantwortliche Stelle</h2>
            <p className="mt-2 text-muted-foreground">
              Verantwortlich für die Datenverarbeitung ist das Team hinter
              Preserve Food. Du erreichst uns unter{" "}
              <a
                className="font-semibold underline underline-offset-4"
                href={`mailto:${supportEmail}`}
              >
                {supportEmail}
              </a>
              .
            </p>
          </article>

          <article className="rounded-lg border bg-card/60 p-5">
            <h2 className="text-xl font-semibold">Zwecke & Daten</h2>
            <ul className="mt-2 space-y-2 text-muted-foreground">
              <li>
                Betrieb der Website (Server-Logs, technische Cookies für
                Sitzungen).
              </li>
              <li>
                Kommunikation bei Support- oder Löschanfragen (Kontaktdaten,
                Anfrageinhalt).
              </li>
              <li>
                Nur die nötigsten Daten werden verarbeitet; wir verzichten auf
                unnötiges Tracking.
              </li>
            </ul>
          </article>

          <article className="rounded-lg border bg-card/60 p-5">
            <h2 className="text-xl font-semibold">Rechtsgrundlagen</h2>
            <p className="mt-2 text-muted-foreground">
              Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO
              (Vertragserfüllung bzw. vorvertragliche Maßnahmen), lit. f
              (berechtigtes Interesse am sicheren Betrieb) sowie Art. 6 Abs. 1
              lit. c (gesetzliche Pflichten), sofern anwendbar.
            </p>
          </article>

          <article className="rounded-lg border bg-card/60 p-5">
            <h2 className="text-xl font-semibold">Speicherdauer</h2>
            <p className="mt-2 text-muted-foreground">
              Wir bewahren personenbezogene Daten nur so lange auf, wie es für
              die genannten Zwecke oder gesetzliche Aufbewahrungsfristen
              erforderlich ist. Log-Daten werden automatisch nach kurzer Zeit
              gelöscht oder anonymisiert.
            </p>
          </article>
        </section>

        <section className="rounded-lg border bg-card/60 p-6 space-y-4">
          <h2 className="text-xl font-semibold">Deine Rechte</h2>
          <p className="text-muted-foreground">
            Du hast das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
            gegen bestimmte Verarbeitungen. Wenn du glaubst, dass wir gegen
            Datenschutzrecht verstoßen, hast du das Recht, dich bei einer
            Aufsichtsbehörde zu beschweren.
          </p>
          <p className="text-muted-foreground">
            Kontaktiere uns dafür einfach unter{" "}
            <a
              className="font-semibold underline underline-offset-4"
              href={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </a>
            . Wir kümmern uns zeitnah um dein Anliegen.
          </p>
        </section>
      </div>
    </main>
  );
}


