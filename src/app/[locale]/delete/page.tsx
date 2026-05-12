import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalSection, LegalShell } from "@/components/legal/LegalShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "delete" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DeletePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("delete");
  const tCommon = await getTranslations("common");
  const email = tCommon("supportEmail");

  const subject = encodeURIComponent(t("subjectPrefix"));
  const body = encodeURIComponent(t("bodyText"));
  const mailtoHref = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <LegalShell kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      <LegalSection title={t("steps.title")}>
        <ol className="list-decimal space-y-2 pl-5">
          <li>{t("steps.step1")}</li>
          <li>{t("steps.step2")}</li>
          <li>{t("steps.step3")}</li>
        </ol>
        <div className="pt-2">
          <a
            href={mailtoHref}
            className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {t("buttonRequest")}
          </a>
        </div>
        <p className="text-sm">
          {t.rich("altContact", {
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

      <LegalSection title={t("scope.title")}>
        <p>{t("scope.intro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{t("scope.item1")}</li>
          <li>{t("scope.item2")}</li>
          <li>{t("scope.item3")}</li>
        </ul>
        <p className="text-sm">{t("scope.retentionNote")}</p>
      </LegalSection>

      <LegalSection title={t("responseTime.title")}>
        <p>{t("responseTime.body")}</p>
      </LegalSection>
    </LegalShell>
  );
}
