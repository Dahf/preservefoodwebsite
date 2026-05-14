import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalSection, LegalShell } from "@/components/legal/LegalShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const tCommon = await getTranslations("common");
  const email = tCommon("supportEmail");
  const lastUpdated = locale === "de" ? "14. Mai 2026" : "May 14, 2026";

  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      intro={t("intro")}
    >
      <p className="text-sm text-muted-foreground">
        {tCommon("lastUpdated", { date: lastUpdated })}
      </p>

      <LegalSection title={t("controller.title")}>
        <p>{t("controller.body")}</p>
        <address className="not-italic">
          Silas Beckmann
          <br />
          Schwickartshäuser Str. 3
          <br />
          63691 Ranstadt
          <br />
          Deutschland
        </address>
        <p>
          {t("controller.contactPrefix")}{" "}
          <a
            className="font-semibold underline underline-offset-4 text-foreground"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t("data.title")}>
        <p>{t("data.intro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("data.account")}</li>
          <li>{t("data.content")}</li>
          <li>{t("data.images")}</li>
          <li>{t("data.push")}</li>
          <li>{t("data.subscription")}</li>
          <li>{t("data.logs")}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t("purposes.title")}>
        <p>{t("purposes.body")}</p>
      </LegalSection>

      <LegalSection title={t("thirdParty.title")}>
        <p>{t("thirdParty.intro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("thirdParty.supabase")}</li>
          <li>{t("thirdParty.vercel")}</li>
          <li>{t("thirdParty.ai")}</li>
          <li>{t("thirdParty.stores")}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t("auth.title")}>
        <p>{t("auth.body")}</p>
      </LegalSection>

      <LegalSection title={t("health.title")}>
        <p>{t("health.body")}</p>
      </LegalSection>

      <LegalSection title={t("children.title")}>
        <p>{t("children.body")}</p>
      </LegalSection>

      <LegalSection title={t("cookies.title")}>
        <p>{t("cookies.intro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("cookies.essential")}</li>
          <li>{t("cookies.preferences")}</li>
          <li>{t("cookies.noTracking")}</li>
        </ul>
        <p>{t("cookies.control")}</p>
      </LegalSection>

      <LegalSection title={t("retention.title")}>
        <p>{t("retention.body")}</p>
      </LegalSection>

      <LegalSection title={t("rights.title")}>
        <p>{t("rights.body")}</p>
        <p>{t("rights.complaint")}</p>
      </LegalSection>

      <LegalSection title={t("deletion.title")}>
        <p>{t("deletion.body")}</p>
      </LegalSection>

      <LegalSection title={t("contact.title")}>
        <p>
          {t.rich("contact.body", {
            email: () => (
              <a
                className="font-semibold underline underline-offset-4 text-foreground"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            ),
          }) as React.ReactNode}
        </p>
      </LegalSection>
    </LegalShell>
  );
}
