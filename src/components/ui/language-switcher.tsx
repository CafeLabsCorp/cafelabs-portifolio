"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "pt" ? "en" : "pt";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="px-3 py-2 rounded-full border border-borderUI hover:bg-foreground/5 transition-colors font-fira text-xs uppercase tracking-wide text-foreground"
      aria-label={t("label")}
    >
      {nextLocale}
    </button>
  );
}
