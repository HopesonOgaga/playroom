import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-[var(--dark-bg)] text-white">
      {/* Top Navigation */}
      <header className="flex justify-between items-center border-b border-[var(--red-start)]/20 px-8 py-4 bg-[var(--dark-bg)]/95 backdrop-blur-lg sticky top-0 z-10 shadow-[0_2px_12px_rgba(255,0,0,0.2)]">
        {/* Left - Logo & Links */}
        <ul className="flex gap-8 items-center">
          <Link to={"/"}>
            <div className="text-3xl md:text-4xl italic font-extrabold tracking-wide bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] bg-clip-text text-transparent">
              playroom
            </div>
          </Link>
          <Link
            to="/event"
            className="capitalize text-base font-medium hover:text-[var(--red-end)] transition"
          >
            events
          </Link>
          <Link
            to="/players"
            className="capitalize text-base font-medium hover:text-[var(--red-end)] transition"
          >
            players
          </Link>
        </ul>

        {/* Right - Profile & Create Button */}
        <div className="flex items-center gap-6">
          <Link to={"/event"}>
            <button className="cursor-pointer w-40 h-11 rounded-lg bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] text-white font-semibold capitalize italic hover:scale-105 transition-all duration-300 shadow-md">
              + Create Tournament
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-full shadow-md w-12 h-12 border border-[var(--red-end)]/40 overflow-hidden">
              <img
                src="/images/cysictap.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="capitalize font-medium text-gray-300">metamask</p>
          </div>
        </div>
      </header>

      {/* Info Boxes */}
      <section className="p-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center w-full lg:w-3/4">
          {[
            {
              title: "Total Events",
              value: "42",
              change: "+5 since last month",
            },
            {
              title: "Active Players",
              value: "+2,350",
              change: "+1800% since last month",
            },
            {
              title: "Rewards Distributed",
              value: "12.2 ETH",
              change: "+19% from last month",
            },
            {
              title: "Engagement Rate",
              value: "+57.3%",
              change: "+5 since last month",
            },
          ].map((box, i) => (
            <div
              key={i}
              className="w-full h-[28vh] bg-gradient-to-br from-[var(--red-start)]/10 to-[var(--dark-bg)] border border-[var(--red-end)]/20 rounded-xl shadow-md hover:shadow-[0_0_25px_rgba(255,80,80,0.2)] transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <p className="text-xl md:text-2xl font-semibold capitalize text-[var(--red-end)]">
                  {box.title}
                </p>
                <p className="text-2xl font-bold text-white">{box.value}</p>
                <p className="text-sm font-medium text-emerald-400">
                  {box.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
