"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain } from "@/lib/thirdweb";
import { createWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export function WalletConnect() {
  const account = useActiveAccount();

  return (
    <div className="flex flex-col items-center gap-4">
      <ConnectButton
        client={client}
        chain={chain}
        wallets={wallets}
        connectModal={{
          title: "Connect Wallet",
          size: "compact",
          showThirdwebBranding: false,
        }}
        theme="light"
      />
      {account && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </p>
      )}
    </div>
  );
}
