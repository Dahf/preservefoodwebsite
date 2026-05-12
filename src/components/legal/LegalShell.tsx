import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export async function LegalShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            ← {tCommon("appName")}
          </Link>
          <LocaleSwitcher />
        </div>

        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {kicker}
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          {intro ? (
            <p className="text-lg text-muted-foreground">{intro}</p>
          ) : null}
        </header>

        <div className="space-y-8">{children}</div>

        <footer className="border-t pt-6">
          <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {tNav("privacy")}
            </Link>
            <Link
              href="/delete"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {tNav("delete")}
            </Link>
            <Link
              href="/imprint"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {tNav("imprint")}
            </Link>
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {tNav("terms")}
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card/60 p-6 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}
