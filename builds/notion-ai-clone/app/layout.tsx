import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Notion Clone With AI Capabilities",
  description: "Attempt to Clone Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header></Header>
          <div className="flex min h-screen">
            {/*Sidebar */}
            <Sidebar />

            <div className="flex-1 p-4 bg-gray-100 scrollbar-hide">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
