import React from "react";

const featuredPrograms = [
  {
    title: "Valorant Showdown",
    img: "/images/valorant.jpg",
    desc: "Compete with top agents for the $5,000 prize pool.",
  },
  {
    title: "FIFA Pro Cup",
    img: "/images/fifa.jpg",
    desc: "1v1 tournament featuring top-ranked players.",
  },
  {
    title: "CS2 Frag Fest",
    img: "/images/cs2.jpg",
    desc: "Battle in intense matches across global servers.",
  },
  {
    title: "Apex Legends Arena",
    img: "/images/apex.jpg",
    desc: "Join squads and fight for the Apex Champion title.",
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Featured Programs
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-8">
          {featuredPrograms.map((program, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-300 shadow-md overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={program.img}
                alt={program.title}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 flex flex-col gap-2 text-center">
                <h3 className="font-semibold text-lg">{program.title}</h3>
                <p className="text-sm text-gray-600">{program.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
