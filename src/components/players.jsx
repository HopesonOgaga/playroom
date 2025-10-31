// src/pages/PlayerTournaments.jsx
import React from "react";
import HEADER from "../page/header";
import FOOTER from "../page/footer";


export default function PlayerTournaments() {
  const tournaments = [
    {
      id: 1,
      name: "Neko Showdown",
      desc: "Compete for the ultimate $10 prize pool!",
      logo: "/images/card/valorant.png",
      status: "Upcoming",
      date: "2025-11-01",
      prize: "$10",
    },
    {
      id: 2,
      name: "FIFA Pro Cup",
      desc: "1v1 tournament featuring top-ranked players.",
      logo: "/images/card/fifa.png",
      status: "Ongoing",
      date: "2025-11-05",
      prize: "$50",
    },
    {
      id: 3,
      name: "CS2 Frag Fest",
      desc: "Battle in intense matches across global servers.",
      logo: "/images/card/csgo.png",
      status: "Ongoing",
      date: "2025-11-10",
      prize: "$20",
    },
    {
      id: 4,
      name: "Apex Legends Arena",
      desc: "Join squads and fight for the Apex Champion title.",
      logo: "/images/card/apex.jpg",
      status: "Upcoming",
      date: "2025-11-15",
      prize: "$30",
    },
  ];

  return (
    <>
     <HEADER></HEADER>
      {/* Carousel Placeholder */}
      <section className="w-full py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Featured Tournaments
          </h2>
          <div className="h-48 bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
            Carousel Placeholder
          </div>
        </div>
      </section>

      {/* Tournament Grid */}
      <section className="w-full py-20 text-white bg-[var(--dark-bg)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Join a Tournament
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="relative rounded-2xl border border-gray-700 p-4 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-gray-900"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      t.status === "Ongoing"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <img
                  src={t.logo}
                  alt={t.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />

                <h3 className="text-xl font-semibold text-white mb-2">{t.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{t.desc}</p>
                <p className="text-gray-400 text-sm mb-2">Date: {t.date}</p>
                <span className="text-lg font-bold text-white mb-4">Prize: {t.prize}</span>

                <button
                  className="bg-[#ff4545] hover:bg-[#ff7c7c] text-white px-4 py-2 rounded-lg transition"
                >
                  Join Tournament
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FOOTER></FOOTER>
    </>
  );
}
