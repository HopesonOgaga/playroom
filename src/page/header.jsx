"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const HEADER = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firestore, setFirestore] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyCBTGHXXsekuTTlNm7pnnbCwkrDLK2VDkQ",
    authDomain: "playroom-a8d5a.firebaseapp.com",
    projectId: "playroom-a8d5a",
    storageBucket: "playroom-a8d5a.appspot.com",
    messagingSenderId: "237198485447",
    appId: "1:237198485447:web:75e0761720d3dfec26dbe2",
    measurementId: "G-9T7B4RZR5R",
  };

  // Initialize Firebase
  useEffect(() => {
    try {
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      const auth = getAuth(app);
      const firestoreInstance = getFirestore(app);
      setFirestore(firestoreInstance);

      signInAnonymously(auth)
        .then((userCredential) => setUserId(userCredential.user.uid))
        .catch(() => setUserId(crypto.randomUUID()));
    } catch (err) {
      console.error("Firebase initialization failed:", err);
    }
  }, []);

  // Wagmi
  const { address, isConnected } = useAccount();
  const { connect, isPending, error, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const injectedConnector = connectors.find((c) => c.id === "injected");

  // Save wallet to Firebase
  useEffect(() => {
    if (isConnected && address && firestore && userId) {
      const saveWallet = async () => {
        try {
          const walletDocRef = doc(firestore, "wallets", address);
          await setDoc(walletDocRef, {
            address,
            userId,
            walletType: "injected",
            connectedAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
          }, { merge: true });
        } catch (err) {
          console.error("Failed to save wallet:", err);
        }
      };
      saveWallet();
    }
  }, [isConnected, address, firestore, userId]);

  // Wallet Button
  const WalletButton = () => {
    if (isPending) return <span>Connecting...</span>;
    if (isConnected) return (
      <div className="flex items-center justify-between w-full px-2">
        <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
        <span onClick={disconnect} className="ml-2 text-sm hover:underline cursor-pointer">Logout</span>
      </div>
    );
    return <span>Connect Wallet</span>;
  };

  const handleMobileNavClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to={"/"}>
          <div className="text-3xl md:text-5xl italic font-extrabold tracking-wide bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] bg-clip-text text-transparent">
            playroom
          </div>
        </Link>

        {/* Desktop Menu */}
        <section className="flex gap-3">
          <ul className="hidden md:flex items-center gap-8 text-sm uppercase font-medium tracking-wide">
            <Link to="/dashboard"><li className="hover:text-[var(--red-end)] cursor-pointer">dashboard</li></Link>
            <Link to="/tournament"><li className="hover:text-[var(--red-end)] cursor-pointer">tournament</li></Link>
            <Link to="/challenges"><li className="hover:text-[var(--red-end)] cursor-pointer">challenges</li></Link>
          </ul>

          {/* Desktop Wallet */}
          <div
            onClick={() => !isConnected && connect({ connector: injectedConnector })}
            className="hidden md:flex w-44 h-11 items-center justify-center rounded-xl font-semibold transition-all duration-300 cursor-pointer border border-[var(--red-end)] text-[var(--red-start)] hover:bg-gradient-to-r hover:from-[var(--red-start)] hover:to-[var(--red-end)] hover:text-white"
          >
            <WalletButton />
          </div>
        </section>

        {/* Mobile Hamburger */}
        <button className="md:hidden flex flex-col gap-[6px]" onClick={() => setMenuOpen(!menuOpen)}>
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
              className="fixed inset-0 bg-black/70 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-black z-50 flex flex-col p-6 space-y-6 border-l border-[var(--red-end)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center">
                <p className="text-2xl italic font-bold text-[var(--red-end)] capitalize">playroom</p>
                <button onClick={() => setMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col gap-6 text-lg">
                <li onClick={() => handleMobileNavClick("/dashboard")} className="hover:text-[var(--red-end)] cursor-pointer font-semibold capitalize">dashboard</li>
                <li onClick={() => handleMobileNavClick("/tournament")} className="hover:text-[var(--red-end)] cursor-pointer font-semibold capitalize">tournament</li>
                <li onClick={() => handleMobileNavClick("/challenges")} className="hover:text-[var(--red-end)] cursor-pointer font-semibold capitalize">challenges</li>
              </ul>

              {/* Mobile Wallet */}
              <div
                onClick={() => !isConnected && connect({ connector: injectedConnector })}
                className="w-full h-12 border border-[var(--red-end)] flex items-center justify-center rounded-lg text-[var(--red-start)] hover:bg-gradient-to-r hover:from-[var(--red-start)] hover:to-[var(--red-end)] hover:text-white transition-all duration-300"
              >
                <WalletButton />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Connection Error */}
      {error && (
        <div className="hidden md:block fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-red-800 text-white p-2 rounded-t-lg shadow-xl">
          Connection failed: {error.message.substring(0, 70)}
        </div>
      )}
    </header>
  );
};

export default HEADER;
