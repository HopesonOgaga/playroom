import React from "react";

const featuredPrograms = [
  {
    title: "Valorant Showdown",
    img: "/images/valorant.png",
    desc: "Compete with top agents for the $5,000 prize pool.",
    link: "https://playvalorant.com/en-gb/",
  },
  {
    title: "FIFA Pro Cup",
    img: "/images/fifa.png",
    desc: "1v1 tournament featuring top-ranked players.",
    link: "https://www.playstation.com/en-us/games/ea-sports-fc/",
  },
  {
    title: "CS2 Frag Fest",
    img: "/images/csgo2.png",
    desc: "Battle in intense matches across global servers.",
    link: "https://www.counter-strike.net/cs2",
  },
  {
    title: "Apex Legends Arena",
    img: "/images/apex2.jpg",
    desc: "Join squads and fight for the Apex Champion title.",
    link: "https://www.ea.com/games/apex-legends/apex-legends",
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="w-full py-16 px-6 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          Featured Programs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredPrograms.map((program, index) => (
            <a
              key={index}
              href={program.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-gray-700 shadow-md overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl block"
            >
              <img
                src={program.img}
                alt={program.title}
                className="w-full h-3/4 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-4 flex flex-col gap-2 text-center">
                <h3 className="font-semibold text-lg">{program.title}</h3>
                <p className="text-sm text-gray-300">{program.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
