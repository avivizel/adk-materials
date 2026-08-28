import type { Metadata, Viewport } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Footer } from "@/components/Footer";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "מענה — טיפול בהתמכרויות בישראל",
    template: "%s | מענה",
  },
  description:
    "חיפוש בשירותים ציבוריים ובמסגרות פרטיות מפוקחות בישראל לפי סוג התמכרות, אזור וסוג טיפול.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "מענה",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <body className="pb-20 md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow"
        >
          דלג לתוכן הראשי
        </a>
        <main id="main-content" className="min-h-[calc(100dvh-5rem)]">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
