import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalSection, LegalShell } from "@/components/legal/LegalShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <LegalShell kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      <LegalSection title={t("service.title")}>
        <p>{t("service.body")}</p>
        <p>{t("service.tiers")}</p>
      </LegalSection>

      <LegalSection title={t("subscription.title")}>
        <p>{t("subscription.intro")}</p>
        <p>{t("subscription.merchant")}</p>
        <p>{t("subscription.pricing")}</p>
        <p>{t("subscription.renewal")}</p>
        <p>{t("subscription.manage")}</p>
        <p>{t("subscription.withdrawal")}</p>
      </LegalSection>

      <LegalSection title={t("account.title")}>
        <p>{t("account.body")}</p>
      </LegalSection>

      <LegalSection title={t("age.title")}>
        <p>{t("age.body")}</p>
      </LegalSection>

      <LegalSection title={t("userContent.title")}>
        <p>{t("userContent.body")}</p>
        <p>{t("userContent.responsibility")}</p>
      </LegalSection>

      <LegalSection title={t("conduct.title")}>
        <p>{t("conduct.intro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("conduct.item1")}</li>
          <li>{t("conduct.item2")}</li>
          <li>{t("conduct.item3")}</li>
          <li>{t("conduct.item4")}</li>
        </ul>
      </LegalSection>

      <LegalSection title={t("thirdPartyContent.title")}>
        <p>{t("thirdPartyContent.body")}</p>
        <p>{t("thirdPartyContent.rights")}</p>
      </LegalSection>

      <LegalSection title={t("availability.title")}>
        <p>{t("availability.body")}</p>
      </LegalSection>

      <LegalSection title={t("termination.title")}>
        <p>{t("termination.body")}</p>
      </LegalSection>

      <LegalSection title={t("liability.title")}>
        <p>{t("liability.body")}</p>
      </LegalSection>

      <LegalSection title={t("changes.title")}>
        <p>{t("changes.body")}</p>
      </LegalSection>

      <LegalSection title={t("law.title")}>
        <p>{t("law.body")}</p>
      </LegalSection>

      <LegalSection title={t("severability.title")}>
        <p>{t("severability.body")}</p>
      </LegalSection>
    </LegalShell>
  );
}
