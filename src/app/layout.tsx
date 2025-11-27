import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { WalletConnect } from "@/components/wallet-connect";

export const metadata: Metadata = {
  title: "Digital Prophets",
  description: "Gamified truth verification — submit memes, vote, mint NFTs on Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="w-full border-b py-4 px-6 flex items-center justify-between">
            <div className="text-lg font-semibold">Digital Prophets</div>
            <nav>
              <ul className="flex items-center gap-4">
                <li>
                  <a href="/" className="text-sm text-gray-700">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/mint" className="text-sm text-gray-700">
                    Mint
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="text-sm text-gray-700">
                    Dashboard
                  </a>
                </li>
                <li>
                  <WalletConnect />
                </li>
              </ul>
            </nav>
          </header>
          <main className="px-6 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
