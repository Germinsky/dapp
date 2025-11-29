import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-5 text-center">
        <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          DIGITAL PROPHETS
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mt-6 mb-10 max-w-2xl">
          Mint Truth. Get Rich. Save the Future.
        </p>
        <a
          href="https://thirdweb.com/base/0x1890E4f2668b98170B618bA45Bc1B5721ACf9575"
          className="btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          GET $PROPH NOW
        </a>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-5 max-w-6xl mx-auto">
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-20">
          The Only Token That Pays You to Defend Truth
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Card 1 */}
          <div className="card-feature text-center">
            <h3 className="text-cyan-400 text-xl sm:text-2xl font-bold mb-4">
              01 → Get $PROPH
            </h3>
            <p className="text-gray-300 mb-6">
              Instant power on Base. One click → voting rights + minting rights.
            </p>
            <a
              href="https://thirdweb.com/base/0x1890E4f2668b98170B618bA45Bc1B5721ACf9575"
              className="btn-primary text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              BUY NOW
            </a>
          </div>

          {/* Card 2 */}
          <div className="card-feature text-center">
            <h3 className="text-cyan-400 text-xl sm:text-2xl font-bold mb-4">
              02 → Stake & Rank Up
            </h3>
            <p className="text-gray-300">
              Disciple → Seer → Oracle → Archprophet
              <br />
              More stake = more rewards forever
            </p>
          </div>

          {/* Card 3 */}
          <div className="card-feature text-center">
            <h3 className="text-cyan-400 text-xl sm:text-2xl font-bold mb-4">
              03 → Play & Earn Forever
            </h3>
            <p className="text-gray-300">
              Submit memes → Canonized NFTs
              <br />
              Vote → split revenue
              <br />
              Burn → pump liquidity
              <br />
              Prophecy Wars + Revelation Drops
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 sm:mt-24">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
            Every action makes $PROPH scarcer
            <br />
            <span className="text-cyan-400">and every holder richer.</span>
          </p>
          <a
            href="https://thirdweb.com/base/0x1890E4f2668b98170B618bA45Bc1B5721ACf9575"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            JOIN THE PROPHECY → GET $PROPH
          </a>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-12 text-center border-t border-gray-800">
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/mint"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Submit & Mint
          </Link>
          <Link
            href="/dashboard"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
