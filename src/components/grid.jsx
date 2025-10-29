function Games() {
  const games = [
    {
      name: "Valorant",
      desc: "Tactical shooter full of intense rounds and strategy.",
      logo: "/images/valorant.jpg",
      status: "Ongoing",
     
    },
    {
      name: "Apex Legends",
      desc: "Battle royale with heroes, squads, and fast-paced combat.",
      logo: "/images/apex.jpg",
      status: "Upcoming",
     
    },
    {
      name: "CS2",
      desc: "Classic FPS reinvented for the modern era.",
      logo: "/images/cs2.jpg",
      status: "Ongoing",
      
    },
    {
      name: "Fortnite",
      desc: "Creative, competitive, and endlessly fun.",
      logo: "/images/fortnite.jpg",
      status: "Ongoing",
     
    },
    {
      name: "League of Legends",
      desc: "Battle for dominance in the Rift with your team.",
      logo: "/images/lol.jpg",
      status: "Ongoing",
      
    },
    {
      name: "PUBG",
      desc: "Survive, scavenge, and conquer in open-world chaos.",
      logo: "/images/pubg.jpg",
      status: "Upcoming",
      
    },
  ];

  return (
    <section className="w-full py-20 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Games
        </p>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((p, index) => (
            <div
              key={index}
              className="relative  rounded-2xl border border-gray-700 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    p.status === "Ongoing"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <img
                src={p.logo}
                alt={p.name}
                className="w-24 h-24 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-semibold text-white mb-2">
                {p.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{p.desc}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Games;
