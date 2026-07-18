import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";
import { routing } from "../../i18n/routing";
import { ThemeProvider } from "../../providers/theme-provider";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ['400', '600', '700', '900'], subsets: ["latin"], variable: "--font-poppins" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Café Labs | Sandbox Multisetorial",
  description: "Ecossistema de experimentação prática onde ideias viram software, design e produto.",
  icons: {
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
  },
};

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
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
