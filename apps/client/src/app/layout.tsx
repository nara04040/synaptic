import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navigation } from "@/components/landing/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synaptic - Knowledge Connection Platform",
  description: "Connect and organize your knowledge with Synaptic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation isAuthenticated={isAuthenticated}/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
