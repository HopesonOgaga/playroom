"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HEADER = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--dark-bg)]/80 backdrop-blur-lg z-50 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-3xl md:text-5xl italic font-extrabold tracking-wide bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] bg-clip-text text-transparent">
            playroom
          </div>
        </Link>

        {/* Desktop Menu */}
        <section className="flex gap-3">
          <ul className="hidden md:flex items-center gap-8 text-sm uppercase font-medium tracking-wide">
            <Link to="/dashboard">
              <li className="hover:text-[var(--red-end)] transition-colors cursor-pointer">
                dashboard
              </li>
            </Link>
            <li className="hover:text-[var(--red-end)] transition-colors cursor-pointer">
              tournament
            </li>
            <li className="hover:text-[var(--red-end)] transition-colors cursor-pointer">
              challenges
            </li>
          </ul>

          {/* Connect Button */}
          <div className="hidden md:flex w-36 h-11 border border-[var(--red-end)] items-center justify-center rounded-xl text-[var(--red-start)] hover:bg-gradient-to-r hover:from-[var(--red-start)] hover:to-[var(--red-end)] hover:text-white font-semibold transition-all duration-300 cursor-pointer">
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
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[var(--dark-bg)]/95 z-50 flex flex-col p-6 space-y-8 border-l border-[var(--red-end)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-[var(--red-end)]">playroom</p>
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
                <li className="hover:text-[var(--red-end)] transition-colors">
                  dashboard
                </li>
                <li className="hover:text-[var(--red-end)] transition-colors">
                  tournament
                </li>
                <li className="hover:text-[var(--red-end)] transition-colors">
                  challenges
                </li>
              </ul>

              <div className="w-full h-12 border border-[var(--red-end)] flex items-center justify-center rounded-lg text-[var(--red-start)] hover:bg-gradient-to-r hover:from-[var(--red-start)] hover:to-[var(--red-end)] hover:text-white transition-all duration-300">
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
