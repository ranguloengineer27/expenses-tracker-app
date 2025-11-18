import type { Metadata } from "next";
import "../src/ui/index.css";
import "../src/ui/App.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Expenses Tracker",
  description: "Track your expenses efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

