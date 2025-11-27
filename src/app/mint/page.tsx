"use client";

import { useState } from "react";
import { client } from "@/lib/thirdweb";

export default function MintPage() {
  const [title, setTitle] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Preparing metadata...");

    try {
      const addr = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

      // Upload image (if present) to thirdweb storage
      let imageUri: string | undefined;
      if (image) {
        setStatus("Uploading image to storage...");
        try {
          // client.storage.upload accepts File/Blob and returns a URI string
          // If the SDK shape differs, this will be caught and surfaced in the UI.
          // @ts-ignore
          imageUri = await client.storage.upload(image as File);
        } catch (err) {
          console.error("image upload failed", err);
          setStatus("Image upload failed; see console for details.");
          return;
        }
      }

      // Build metadata
      const metadata = {
        name: title || "Untitled Meme",
        description: claim,
        image: imageUri,
        properties: { evidence },
      } as any;

      setStatus("Uploading metadata to storage...");
      let metadataUri: string | undefined;
      try {
        // @ts-ignore
        metadataUri = await client.storage.upload(metadata);
      } catch (err) {
        console.error("metadata upload failed", err);
        setStatus("Metadata upload failed; see console for details.");
        return;
      }

      // If a contract address is configured, attempt a mint via thirdweb client.
      if (addr && addr.length > 0) {
        setStatus("Submitting mint transaction to contract...");
        try {
          const contract = await client.getContract(addr);

          // Resolve the connected wallet address (if available)
          let toAddress: string | undefined;
          try {
            // @ts-ignore
            toAddress = await client.wallet.getAddress();
          } catch (e) {
            console.warn("could not resolve wallet address", e);
          }

          // Try common mint methods in order of likelihood
          // 1) contract.erc721.mintTo(address, metadataUri)
          // 2) contract.erc721.mint(metadata)
          // 3) contract.call("mint", [toAddress, metadataUri])

          if (contract.erc721 && toAddress && contract.erc721.mintTo) {
            await contract.erc721.mintTo(toAddress, metadataUri);
            setStatus("Mint transaction submitted (erc721.mintTo). Check your wallet/tx history.");
            return;
          }

          if (contract.erc721 && contract.erc721.mint) {
            await contract.erc721.mint({ metadata: metadata });
            setStatus("Mint transaction submitted (erc721.mint).");
            return;
          }

          // Fallback: try a generic call
          try {
            // @ts-ignore
            await contract.call("mint", [toAddress ?? "", metadataUri]);
            setStatus("Mint transaction submitted (generic call).");
            return;
          } catch (err) {
            console.warn("generic mint call failed", err);
          }

          setStatus("Contract found but no recognized mint method available.");
          console.log({ metadataUri, metadata });
          return;
        } catch (err) {
          console.error("contract mint error", err);
          setStatus("Contract call failed; see console for details.");
          return;
        }
      }

      setStatus("No contract configured — metadata uploaded locally (see console).");
      console.log({ metadataUri, metadata });
    } catch (err) {
      console.error(err);
      setStatus("Error preparing mint: " + (err as Error).message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">Submit a Meme</h1>
      <p className="mt-2 text-gray-600">Provide the claim, evidence links, and an image.</p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border px-3 py-2 rounded"
        />

        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Claim / Description"
          className="border px-3 py-2 rounded h-24"
        />

        <input
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="Evidence links (comma separated)"
          className="border px-3 py-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          <span className="text-sm text-gray-600">{status}</span>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        <p>Tip: set `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` to your NFT contract to enable direct minting.</p>
      </div>
    </div>
  );
}
