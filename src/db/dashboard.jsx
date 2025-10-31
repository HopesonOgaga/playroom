import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { db } from "./firebase";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new injected() });
  const { disconnect } = useDisconnect();

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalPrize, setTotalPrize] = useState(0);

  // Save wallet to localStorage + Firestore and ensure wallet doc exists
  useEffect(() => {
    const saveWallet = async () => {
      if (isConnected && address) {
        localStorage.setItem("walletAddress", address);
        const walletRef = doc(db, "wallets", address);
        try {
          // ensure doc exists (merge:true won't overwrite existing totals)
          await setDoc(walletRef, { address, connectedAt: new Date().toISOString() }, { merge: true });

          // read initial values (in case they exist)
          const snap = await getDoc(walletRef);
          if (snap.exists()) {
            const data = snap.data();
            setTotalEvents(data.totalEvents || 0);
            setTotalPrize(data.totalPrize || 0);
          }
        } catch (error) {
          console.error("❌ Error saving wallet:", error);
        }
      } else {
        localStorage.removeItem("walletAddress");
        setTotalEvents(0);
        setTotalPrize(0);
      }
    };
    saveWallet();
  }, [isConnected, address]);

  // real-time listener to wallet doc so UI updates immediately when stats change
  useEffect(() => {
    if (!address) return;
    const walletRef = doc(db, "wallets", address);
    const unsubscribe = onSnapshot(walletRef, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setTotalEvents(d.totalEvents || 0);
        setTotalPrize(d.totalPrize || 0);
      } else {
        setTotalEvents(0);
        setTotalPrize(0);
      }
    }, (err) => console.error("onSnapshot error:", err));

    return () => unsubscribe();
  }, [address]);

  return (
    <section className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Navigation */}
      <header className="flex justify-between items-center border-b border-[#ff4545]/20 px-8 py-4 bg-[#0a0a0f]/95 backdrop-blur-lg sticky top-0 z-10 shadow-[0_2px_12px_rgba(255,0,0,0.2)]">
        <ul className="flex gap-8 items-center">
          <Link to="/"><h1 className="text-3xl md:text-4xl italic font-extrabold tracking-wide bg-gradient-to-r from-[#ff4545] to-[#ff7c7c] bg-clip-text text-transparent">playroom</h1></Link>
          <Link to="/TournamentDashboard" className="capitalize text-base font-medium hover:text-[#ff7c7c] transition">events</Link>
          <Link to="/players" className="capitalize text-base font-medium hover:text-[#ff7c7c] transition">players</Link>
        </ul>

        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-4">
              <div className="rounded-full w-12 h-12 border border-[#ff7c7c]/50 overflow-hidden">
                <img src="/images/cysictap.jpg" alt="profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-400">Connected</span>
                <span className="font-semibold text-[#ff7c7c]">{address.slice(0, 6)}...{address.slice(-4)}</span>
              </div>
              <button onClick={() => disconnect()} className="px-5 py-2 border border-[#ff7c7c]/50 rounded-lg text-gray-300 hover:bg-[#ff4545]/10 transition">Disconnect</button>
            </div>
          ) : (
            <button onClick={() => connect()} className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff4545] to-[#ff7c7c] text-white font-semibold capitalize italic hover:scale-105 transition-all duration-300 shadow-md">connect wallet</button>
          )}
        </div>
      </header>

      {/* Info Boxes */}
      <main className="p-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 justify-items-center w-full lg:w-3/4">
          {[
            { title: "Total Events", value: totalEvents, change: "+ since last month" },
            { title: "Active Players", value: "+2,350", change: "+1800% since last month" },
            { title: "Rewards Distributed", value: `${totalPrize} USDC`, change: "+ since last month" },
            { title: "Engagement Rate", value: "+57.3%", change: "+5 since last month" },
          ].map((box, i) => (
            <div key={i} className="w-full h-[28vh] bg-gradient-to-br from-[#ff4545]/10 to-[#0a0a0f] border border-[#ff7c7c]/20 rounded-xl shadow-md hover:shadow-[0_0_25px_rgba(255,80,80,0.2)] transition-all duration-300 p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <p className="text-xl md:text-2xl font-semibold capitalize text-[#ff7c7c]">{box.title}</p>
                <p className="text-2xl font-bold text-white">{box.value}</p>
                <p className="text-sm font-medium text-emerald-400">{box.change}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Create Tournament */}
      <div className="flex w-full justify-end px-10 pb-10">
        <Link to="/event">
          <button className="cursor-pointer w-48 h-12 rounded-lg bg-gradient-to-r from-[#ff4545] to-[#ff7c7c] text-white font-semibold capitalize italic hover:scale-105 transition-all duration-300 shadow-lg">+ Create Tournament</button>
        </Link>
      </div>
    </section>
  );
}
