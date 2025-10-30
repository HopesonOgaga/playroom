function FOOTER() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 py-12 px-6 md:px-16 border-t border-gray-800">
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Playroom</h2>
          <p className="text-sm leading-relaxed opacity-80">
            The ultimate hub for gamers to create, compete, and conquer.  
            Discover tournaments, connect wallets, and rise to the top.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Communities</li>
            <li className="hover:text-white transition">Players</li>
            <li className="hover:text-white transition">Open Challenges</li>
            <li className="hover:text-white transition">Leaderboard</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Help Center</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm opacity-80 mb-4">
            Subscribe for news, tournaments, and Web3 game drops.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full sm:w-auto flex-grow bg-gray-800 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Playroom. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">Discord</a>
          <a href="#" className="hover:text-white transition">YouTube</a>
        </div>
      </section>
    </footer>
  );
}

export default FOOTER;
