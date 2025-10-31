// src/pages/TournamentEvents.jsx
import React from "react";

export default function TournamentEvents() {
  const tournaments = [
    {
      name: "Neko Showdown",
      desc: "Compete for the ultimate $10 prize pool!",
      logoBase64: "/images/card/valorant.png", // replace with base64 if needed
      status: "Upcoming",
      date: "2025-11-01",
      prize: "$10",
    },
    {
      name: "FIFA Pro Cup",
      desc: "1v1 tournament featuring top-ranked players.",
      logoBase64: "/images/card/fifa.png",
      status: "Ongoing",
      date: "2025-11-05",
      prize: "$50",
    },
    {
      name: "CS2 Frag Fest",
      desc: "Battle in intense matches across global servers.",
      logoBase64: "/images/card/csgo.png",
      status: "Ongoing",
      date: "2025-11-10",
      prize: "$20",
    },
    {
      name: "Apex Legends Arena",
      desc: "Join squads and fight for the Apex Champion title.",
      logoBase64: "/images/card/apex.jpg",
      status: "Upcoming",
      date: "2025-11-15",
      prize: "$30",
    },
  ];

  return (
    <>
    <section className="w-full py-20 text-white bg-[var(--dark-bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Tournament Events
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((t, index) => (
            <div
              key={index}
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
                src={t.logoBase64}
                alt={t.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-white mb-2">{t.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{t.desc}</p>
              <p className="text-gray-400 text-sm mb-2">Date: {t.date}</p>
              <span className="text-lg font-bold text-white">Prize: {t.prize}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
