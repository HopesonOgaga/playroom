import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="min-h-screen bg-white text-gray-900">
      {/* Top Navigation */}
      <header className="flex justify-between items-center border-b border-gray-200 px-8 py-4 shadow-sm bg-white sticky top-0 z-10">
        {/* Left - Nav Links */}
        <ul className="flex gap-8 items-center">
          <Link to={"/"}>
            {" "}
            <div className="text-4xl italic tracking-wide text-orange-500 font-bold capitalize">
              playroom
            </div>
          </Link>
          <Link
            to="/event"
            className="capitalize text-base font-medium hover:text-blue-600 transition"
          >
            events
          </Link>
          <Link
            to="/players"
            className="capitalize text-base font-medium hover:text-blue-600 transition"
          >
            players
          </Link>
        </ul>

        {/* Right - Profile & Button */}
        <div className="flex items-center gap-6 ">
          <Link to={"/event"}>
            {" "}
            <button className="cursor-pointer w-40 h-11 rounded-md bg-blue-600 text-white font-medium capitalize italic hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
              + Create Tournament
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-full shadow-sm w-12 h-12 border border-gray-300 overflow-hidden">
              <img
                src="/images/cysictap.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="capitalize font-medium text-gray-700">metamask</p>
          </div>
        </div>
      </header>

      {/* Info Boxes Section */}
      <section className="p-10 flex justify-center bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center w-full lg:w-2/3">
          {/* Box */}
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
              className="w-full h-[28vh] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100"
            >
              <div className="flex flex-col gap-4">
                <p className="text-2xl font-semibold capitalize">{box.title}</p>
                <p className="text-lg font-medium">{box.value}</p>
                <p className="text-sm font-medium text-emerald-600">
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
