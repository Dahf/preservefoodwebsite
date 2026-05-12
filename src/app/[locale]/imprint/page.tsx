import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalSection, LegalShell } from "@/components/legal/LegalShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "imprint" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("imprint");
  const tCommon = await getTranslations("common");
  const email = tCommon("supportEmail");

  return (
    <LegalShell kicker={t("kicker")} title={t("title")}>
      <LegalSection title={t("tmg.title")}>
        <address className="not-italic">
          Silas Beckmann
          <br />
          Schwickartshäuser Str. 3
          <br />
          63691 Ranstadt
          <br />
          Deutschland
        </address>
      </LegalSection>

      <LegalSection title={t("contact.title")}>
        <p>
          {t("contact.emailLabel")}{" "}
          <a
            className="font-semibold underline underline-offset-4 text-foreground"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t("vat.title")}>
        <p>{t("vat.body")}</p>
      </LegalSection>

      <LegalSection title={t("responsibility.title")}>
        <p>{t("responsibility.body")}</p>
      </LegalSection>

      <LegalSection title={t("disclaimer.title")}>
        <p>{t("disclaimer.content")}</p>
        <p>{t("disclaimer.links")}</p>
      </LegalSection>

      <LegalSection title={t("dispute.title")}>
        <p>{t("dispute.body")}</p>
      </LegalSection>
    </LegalShell>
  );
}
