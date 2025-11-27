"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider client={client} activeChain={chain}>
      {children}
    </ThirdwebProvider>
  );
}
