import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Konto löschen",
  description:
    "Fordere die Löschung deines Kontos und aller zugehörigen Daten an.",
};

export default function DeletePage() {
  const supportEmail = siteConfig.links.email || "mail@preservefood.de";
  const mailtoHref = `mailto:${supportEmail}?subject=Anfrage%20zur%20Kontol%C3%B6schung&body=Bitte%20l%C3%B6scht%20mein%20Konto%20und%20alle%20zugeh%C3%B6rigen%20Daten.%0A%0AMeine%20Account-E-Mail%3A%20%0A(Optional)%20Weitere%20Infos%3A%20`;

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-12 space-y-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Konto löschen
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Löschung deines Kontos anfordern
          </h1>
          <p className="text-lg text-muted-foreground">
            Über diesen Link kannst du die Entfernung deines Kontos und aller
            gespeicherten personenbezogenen Daten anstoßen.
          </p>
        </header>

        <section className="rounded-lg border bg-card/60 p-6 space-y-4">
          <h2 className="text-xl font-semibold">So geht&apos;s</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>Klicke auf den Button unten.</li>
            <li>
              Trage die E-Mail-Adresse deines Accounts und, falls nötig, weitere
              Angaben ein.
            </li>
            <li>Sende die Anfrage ab – wir bestätigen die Löschung zeitnah.</li>
          </ol>

          <div className="space-y-2">
            <a
              href={mailtoHref}
              className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Löschung anfragen
            </a>
            <p className="text-sm text-muted-foreground">
              Alternativ schreib uns direkt an{" "}
              <a
                className="font-semibold underline underline-offset-4"
                href={`mailto:${supportEmail}`}
              >
                {supportEmail}
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}


