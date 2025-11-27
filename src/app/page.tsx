export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-12">
        <h1 className="text-4xl font-extrabold">Digital Prophets</h1>
        <p className="mt-4 text-gray-700">
          Gamified truth verification — submit memes, vote as a DAO, and mint verified
          memes as NFTs on Base.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/mint"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Submit & Mint
          </a>
          <a href="/dashboard" className="px-4 py-2 border rounded-md text-sm">
            View Dashboard
          </a>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 list-decimal list-inside text-gray-700">
          <li>Upload a meme and provide evidence links.</li>
          <li>The community votes on veracity during a voting epoch.</li>
          <li>Verified memes are minted as NFTs; false ones are burned.</li>
        </ol>
      </section>
    </div>
  );
}
