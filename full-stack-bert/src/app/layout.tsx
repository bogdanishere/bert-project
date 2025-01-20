import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import MovieProvider from "@/contexts/MovieProvider";

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ChatBotProvider from "@/contexts/ChatBotProvider";
import ChatBot from "./(chatbot)/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlickFinder - Uncover new stories",
  description: "Discover new movies and TV shows with FlickFinder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <ChatBotProvider>
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full h-screen relative">
                  <Navbar />
                  <MovieProvider>{children}</MovieProvider>
                  <ChatBot />
                </main>
              </SidebarProvider>
            </ChatBotProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
