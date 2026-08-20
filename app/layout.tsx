import "../styles/globals.css";
import React from "react";
import { Providers } from "./providers";

export const metadata = {
  title: "Attiéké Premium Chez Memel",
  description: "Attiéké premium, fabrication artisanale et fierté ivoirienne"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-ivory text-memel-black antialiased">
        <Providers>
          <main className="flex min-h-screen flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
