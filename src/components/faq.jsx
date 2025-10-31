// src/pages/LearnMore.jsx
import React from "react";
import { motion } from "framer-motion";
import FOOTER from "../page/footer";
import HEADER from "../page/header";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "What is Playroom?",
    answer:
      "Playroom is a Web3 gaming platform that allows gamers to join tournaments, compete for prizes, and interact with other players on blockchain-powered events.",
  },
  {
    question: "How do I join a tournament?",
    answer:
      "Once you connect your wallet, you can browse available tournaments on the Events page and click 'Join Tournament' to participate. All entries are recorded on-chain for transparency.",
  },
  {
    question: "What games are supported?",
    answer:
      "We currently support popular titles such as Valorant, FIFA, CS2, Apex Legends, Fortnite, League of Legends, and PUBG. New games are added regularly based on community demand.",
  },
  {
    question: "Are prizes real?",
    answer:
      "Yes! Playroom uses crypto prizes and other digital rewards. Every tournament has a clearly stated prize pool, and winners are automatically distributed via smart contracts.",
  },
  {
    question: "Do I need crypto to participate?",
    answer:
      "Not necessarily. Some tournaments allow free participation, while others require a token entry. We aim to make gaming accessible for everyone.",
  },
  {
    question: "How do I create my own tournament?",
    answer:
      "Our platform allows organizers to create tournaments directly through the Dashboard. You can set the game, prize pool, and description, and players will be able to join through their wallets.",
  },
];

export default function LearnMore() {
  return (
    <>
      <HEADER></HEADER>

      {/* Hero Section */}
      <section className="w-full py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#ff4545] to-[#ff7c7c] bg-clip-text text-transparent"
          >
            Welcome to Playroom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto"
          >
            Playroom is your gateway to competitive Web3 gaming. Connect your
            wallet, explore tournaments, and become part of a community where
            every match is transparent and rewarding.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-[var(--dark-bg)] text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Join a Tournament?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl mb-8"
          >
            Connect your wallet and compete with the best. Your journey in Web3
            gaming starts here.
          </motion.p>
          <Link to={"/players"}>
            {" "}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#ff4545] to-[#ff7c7c] px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
            >
              Explore Tournaments
            </motion.button>
          </Link>
        </div>
      </section>

      <FOOTER />
    </>
  );
}
