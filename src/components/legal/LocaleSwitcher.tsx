"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{t("languageSwitcher")}:</span>
      <div className="flex overflow-hidden rounded-md border">
        {routing.locales.map((loc) => (
          <button
            key={loc}
            type="button"
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              });
            }}
            className={`px-3 py-1 transition ${
              loc === locale
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            }`}
            aria-current={loc === locale ? "true" : undefined}
          >
            {loc === "de" ? t("languageDe") : t("languageEn")}
          </button>
        ))}
      </div>
    </div>
  );
}
