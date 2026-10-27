import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
export const metadata: Metadata = { title: "Arman Hossain Atunu | AI Full-Stack Developer", description: "Portfolio of Arman Hossain Atunu — full-stack web developer building thoughtful digital experiences." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>{children}<Toaster richColors position="top-right"/></ThemeProvider></body></html>; }
