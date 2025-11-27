"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/thirdweb";

type Submission = {
  id?: string | number;
  submitter?: string;
  metadataUri?: string;
  title?: string;
  claim?: string;
};

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const addr = process.env.NEXT_PUBLIC_MEME_REGISTRY_ADDRESS;
    if (!addr) return;

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const contract = await client.getContract(addr);

        // Try a common read method first
        try {
          // @ts-ignore
          const list = await contract.call("getAllSubmissions");
          if (mounted && Array.isArray(list)) {
            setSubmissions(
              list.map((s: any) => ({ id: s.id ?? s[0], submitter: s.submitter ?? s[1], metadataUri: s.metadataUri ?? s[2] }))
            );
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("getAllSubmissions failed", err);
        }

        // Fallback: try to read events (recent submissions)
        try {
          // @ts-ignore
          const ev = await contract.events.getEvents();
          if (mounted && Array.isArray(ev)) {
            const subs = ev
              .filter((e: any) => e.eventName && e.eventName.toLowerCase().includes("submit"))
              .map((e: any) => ({ id: e.transaction.transactionHash, submitter: e.data?.submitter ?? e.data?.from, metadataUri: e.data?.metadata }))
              .slice(0, 20);
            setSubmissions(subs);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("events read failed", err);
        }

        setError("Contract found but no compatible read methods detected.");
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions from contract.");
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Community voting, recent submissions, and leaderboards will appear here.</p>

      <section className="mt-6">
        <h2 className="text-lg font-medium">Recent Submissions</h2>
        {loading && <div className="mt-3 text-sm text-gray-700">Loading submissions...</div>}
        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        {!loading && !error && submissions.length === 0 && (
          <div className="mt-3 text-sm text-gray-700">No submissions found. Set `NEXT_PUBLIC_MEME_REGISTRY_ADDRESS` to a deployed contract to show data.</div>
        )}

        <ul className="mt-4 space-y-3">
          {submissions.map((s) => (
            <li key={String(s.id)} className="border rounded p-3">
              <div className="text-sm text-gray-800">ID: {String(s.id)}</div>
              <div className="text-sm text-gray-600">Submitter: {s.submitter ?? "-"}</div>
              {s.metadataUri && (
                <div className="text-sm text-blue-600">
                  <a href={s.metadataUri} target="_blank" rel="noreferrer">
                    View metadata
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
