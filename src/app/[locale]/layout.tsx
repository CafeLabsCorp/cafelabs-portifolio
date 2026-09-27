import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";
import { routing } from "../../i18n/routing";
import { ThemeProvider } from "../../providers/theme-provider";
import { MotionProvider } from "../../providers/motion-provider";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ['400', '600', '700', '900'], subsets: ["latin"], variable: "--font-poppins" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

const icons: Metadata["icons"] = {
  icon: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/logo_light.svg",
      href: "/logo_light.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/logo_dark.svg",
      href: "/logo_dark.svg",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://cafelabs.net"),
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Café Labs",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
    icons,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${firaCode.variable} font-inter antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <MotionProvider>
              <Header />
              {children}
              <Footer />
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
