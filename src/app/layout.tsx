import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Providers } from "@/components/providers";
import { WalletConnect } from "@/components/wallet-connect";

export const metadata: Metadata = {
  title: "Digital Prophets | Mint Truth → Get Rich",
  description:
    "Gamified truth verification — submit memes, vote as a DAO, and mint verified memes as NFTs on Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white">
        <Providers>
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800 py-4 px-4 sm:px-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Digital Prophets
            </Link>
            <nav>
              <ul className="flex items-center gap-3 sm:gap-6">
                <li className="hidden sm:block">
                  <Link
                    href="/"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mint"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Mint
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <WalletConnect />
                </li>
              </ul>
            </nav>
          </header>
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
