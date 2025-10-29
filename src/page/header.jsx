"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HEADER = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md z-50 mb-10">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo / Title */}
        <Link to={"/"}>
          {" "}
          <div className="text-4xl italic tracking-wide text-orange-500 font-bold capitalize">
            playroom
          </div>
        </Link>

        {/* Desktop Menu */}
        <section className="flex gap-3">
          <ul className="hidden md:flex items-center gap-8 text-sm uppercase font-medium">
            <Link to="/dashboard">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                dashboard
              </li>
            </Link>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              tournament
            </li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">
              challenges
            </li>
          </ul>

          {/* Connect Button */}
          <div className="hidden md:flex w-36 h-11 border-2 border-white items-center justify-center rounded-lg hover:bg-white hover:text-black transition-colors cursor-pointer">
            connect wallet
          </div>
        </section>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-[6px]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-7 h-[2px] bg-white rounded"></span>
          <span className="w-7 h-[2px] bg-white rounded"></span>
          <span className="w-7 h-[2px] bg-white rounded"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dim background */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in Menu from Right */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-gray-900 z-50 flex flex-col p-6 space-y-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">plaroom</p>
                <button onClick={() => setMenuOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col gap-6 text-lg">
                <li className="hover:text-emerald-400 transition-colors">
                  dashboard
                </li>
                <li className="hover:text-emerald-400 transition-colors">
                  tournament
                </li>
                <li className="hover:text-emerald-400 transition-colors">
                  challenges
                </li>
              </ul>

              <div className="w-full h-12 border-2 border-white flex items-center justify-center rounded-lg hover:bg-white hover:text-black transition-colors">
                connect wallet
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HEADER;
