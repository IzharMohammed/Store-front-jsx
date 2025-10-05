import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { OverlayProvider } from "../components/OverlayProvider";
// import { ClientLayoutWrapper } from "../components/client-layout-wrapper";
// import { initializeGuestToken } from "../actions/init-guest-token";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Storefront",
  description: "Generated storekit backend",
};

export default async function RootLayout({ children }) {
  // await initializeGuestToken();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16`}
      >
        <OverlayProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              {/* <ClientLayoutWrapper /> */}
            </ThemeProvider>
          </QueryProvider>
        </OverlayProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
