import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

// Use numeric chain id for Base (8453). Thirdweb components accept a chain id.
export const chain = 8453;
