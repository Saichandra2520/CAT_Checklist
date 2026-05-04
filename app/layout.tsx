import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-[var(--font-body)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
