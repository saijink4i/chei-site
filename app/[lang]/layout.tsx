import type { Metadata } from "next";
import { Noto_Serif_KR, Crimson_Pro } from "next/font/google";
import "../globals.css";
import { languages } from "../i18n/settings";

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "International Wedding",
  description: "Wedding Invitation",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${notoSerifKr.variable} ${crimsonPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
