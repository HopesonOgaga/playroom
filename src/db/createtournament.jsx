import React, { useState, useEffect, useRef } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abiFile from "../smart_contract/abi.json";
import { Link } from "react-router-dom";
import { db } from "./firebase";
import { collection, addDoc, doc, updateDoc, setDoc, increment } from "firebase/firestore";
import { useAccount } from "wagmi";

export default function CreateTournament({ onClose }) {
  const CONTRACT_ADDRESS = "0x433A4773B0E5800a4A6Ab7DdD0e071Db9C75475B";
  const abi = abiFile.abi;
  const { address } = useAccount();

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    prize: "",
    date: "",
    logoBase64: "",
    status: "Upcoming",
  });
  const [txHash, setTxHash] = useState(null);
  const [message, setMessage] = useState(null);

  // keep a ref to the prize value used for the tx so we can save it after tx success
  const prizeRef = useRef(0);

  const { writeContractAsync } = useWriteContract();
  const { isLoading: isPending, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // parse numeric prize from free-form input like "5 ETH" or "$1000"
  const parsePrizeNumber = (raw) => {
    if (!raw && raw !== 0) return 0;
    const cleaned = String(raw).replace(/[^0-9.]/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  // Input Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size exceeds 2MB limit." });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, logoBase64: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveLocalTournament = (data) => {
    const existing = JSON.parse(localStorage.getItem("localTournaments") || "[]");
    existing.push({ localId: Date.now(), ...data, timestamp: new Date().toISOString() });
    localStorage.setItem("localTournaments", JSON.stringify(existing));
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.logoBase64) {
      setMessage({ type: "error", text: "Please upload a tournament logo." });
      return;
    }

    try {
      // Save locally first
      saveLocalTournament(formData);

      // Convert date → timestamp (BigInt)
      const dateTimestamp = BigInt(Math.floor(new Date(formData.date).getTime() / 1000));

      // parse prize numeric value and store to ref (so we don't lose it after reset)
      const prizeNumber = parsePrizeNumber(formData.prize);
      prizeRef.current = prizeNumber;

      // On-chain call
      const txRespOrHash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "createTournament",
        args: [
          formData.name,
          formData.desc,
          // contract expects uint256 prize — ensure you send correct units
          // if your contract expects smallest USDC (6 decimals) you should convert here: Math.floor(prizeNumber * 1e6)
          // This code sends the numeric value as-is — change conversion if needed.
          Math.floor(prizeNumber),
          dateTimestamp,
        ],
      });

      // writeContractAsync might return a tx response object or a hash string
      const normalizedHash = txRespOrHash?.hash || txRespOrHash;
      setTxHash(normalizedHash);

      setMessage({ type: "info", text: "Transaction sent. Waiting for confirmation..." });
    } catch (error) {
      console.error("❌ Error creating tournament:", error);
      setMessage({ type: "error", text: "Failed to create tournament. Check console." });
    }
  };

  // On success, save Firestore: tournament document + atomic wallet stats increment
  useEffect(() => {
    if (isSuccess && address) {
      (async () => {
        try {
          // snapshot current formData values BEFORE resetting form
          const tournamentToSave = {
            wallet: address,
            name: formData.name,
            desc: formData.desc,
            prize: parsePrizeNumber(formData.prize),
            date: formData.date || null,
            logoBase64: formData.logoBase64 || null,
            status: formData.status || "Upcoming",
            createdAt: new Date().toISOString(),
            txHash,
          };

          // add tournament doc
          await addDoc(collection(db, "tournaments"), tournamentToSave);

          // update wallet stats atomically
          const walletRef = doc(db, "wallets", address);
          await setDoc(
            walletRef,
            {
              totalEvents: increment(1),
              totalPrize: increment(tournamentToSave.prize || 0),
            },
            { merge: true }
          );

          // success message + reset form AFTER saving
          setMessage({ type: "success", text: "✅ Tournament Created Successfully!" });

          setFormData({
            name: "",
            desc: "",
            prize: "",
            date: "",
            logoBase64: "",
            status: "Upcoming",
          });
          setTxHash(null);
        } catch (err) {
          console.error("❌ Failed saving tournament/stats to Firestore:", err);
          setMessage({ type: "error", text: "Saved tx but failed storing metadata (check console)." });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, address]);

  const getMessageStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-700";
      case "error":
        return "bg-red-700";
      case "info":
      default:
        return "bg-blue-700";
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[var(--dark-bg)] text-white overflow-y-auto z-50 animate-slideUp">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-[var(--red-start)]/30 bg-[var(--dark-bg)] shadow-[0_2px_12px_rgba(255,0,0,0.2)]">
        <h2 className="text-3xl font-bold italic bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] bg-clip-text text-transparent">
          Create Tournament
        </h2>
        <Link to={"/dashboard"}>
          <button onClick={onClose} className="text-3xl font-bold text-gray-400 hover:text-[var(--red-end)] transition">
            ×
          </button>
        </Link>
      </header>

      <main className="w-full max-w-4xl mx-auto p-10">
        {message && (
          <div className={`${getMessageStyle(message.type)} p-4 rounded-lg mb-6 text-center transition-opacity duration-300 text-white`}>
            {message.text}
          </div>
        )}

        {/* Form (unchanged UI) */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-300">Tournament Name</label>
            <input type="text" name="name" placeholder="Enter tournament name" value={formData.name} onChange={handleChange} required className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition text-white placeholder-gray-500" />
          </div>

          {/* Prize */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-300">Prize</label>
            <input type="text" name="prize" placeholder="e.g. 5 ETH or $1000" value={formData.prize} onChange={handleChange} required className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition text-white placeholder-gray-500" />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-300">Description</label>
            <textarea name="desc" placeholder="Describe your tournament..." value={formData.desc} onChange={handleChange} rows="4" required className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition resize-none text-white placeholder-gray-500"></textarea>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-300">Start Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition text-white [&::-webkit-calendar-picker-indicator]:invert" />
          </div>

          {/* Logo */}
          <div className="flex flex-col">
            <label className="font-semibold mb-2 text-gray-300">Logo Image Upload</label>
            <input type="file" accept="image/*" name="logoFile" onChange={handleFileChange} required className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--red-start)]/20 file:text-[var(--red-start)] hover:file:bg-[var(--red-start)]/30" />
          </div>

          {formData.logoBase64 && (
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="font-semibold text-gray-300">Preview:</label>
              <img src={formData.logoBase64} alt="Tournament Logo Preview" className="w-20 h-20 object-cover rounded-full border border-[var(--red-end)] p-1 shadow-lg" />
            </div>
          )}

          {/* Status */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-2 text-gray-300">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="p-3 bg-transparent border border-[var(--red-end)]/40 rounded-lg focus:ring-2 focus:ring-[var(--red-end)] outline-none transition text-white">
              <option value="Upcoming" className="bg-[var(--dark-bg)]">Upcoming</option>
              <option value="Ongoing" className="bg-[var(--dark-bg)]">Ongoing</option>
              <option value="Completed" className="bg-[var(--dark-bg)]">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end mt-6 gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-500 rounded-lg text-gray-300 hover:bg-[var(--red-end)]/10 transition">Cancel</button>
            <button type="submit" disabled={isPending} className="px-6 py-3 bg-gradient-to-r from-[var(--red-start)] to-[var(--red-end)] text-white rounded-lg font-semibold italic hover:scale-105 transition disabled:opacity-50">
              {isPending ? "Creating..." : "Create Tournament"}
            </button>
          </div>
        </form>
      </main>

      <style>{`
        :root { --dark-bg: #0a0a0f; --red-start: #ff4545; --red-end: #ff7c7c; }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
      `}</style>
    </div>
  );
}
