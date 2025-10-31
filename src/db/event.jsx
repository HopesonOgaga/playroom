import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContractRead, usePublicClient } from "wagmi"; // usePublicClient is often useful for non-hook reads
import { readContract } from "wagmi/actions";
import abiFile from "../smart_contract/abi.json";

const CONTRACT_ADDRESS = "0x433A4773B0E5800a4A6Ab7DdD0e071Db9C75475B";

export default function TournamentDashboard() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);
  const abi = abiFile.abi;

  // 1. Read total number of tournaments
  const { 
    data: tournamentCount,
    isError: isCountError, // Capture error from the initial count read
    isLoading: isCountLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "tournamentCounter",
  });

  useEffect(() => {
    // Wait until the initial count read is done and successful
    if (isCountLoading || tournamentCount === undefined || tournamentCount === null) return;

    const fetchTournaments = async () => {
      const count = Number(tournamentCount.toString());
      const promises = [];

      const fetchTournamentDetails = async (id) => {
        try {
          // You removed local storage logic, so this is cleaner now
          const details = await readContract({
            address: CONTRACT_ADDRESS,
            abi,
            functionName: "getTournamentDetails",
            args: [BigInt(id)],
          });
          
          // You may want to re-add local storage logic here for status/date/logo
          
          return {
            id: details.id.toString(),
            name: details.name,
            desc: details.description,
            prize: details.prizePool.toString(),
            playerCount: details.playerCount.toString(),
            status: "Upcoming",
            date: "N/A",
            logoBase64: null,
          };
        } catch (err) {
          console.error("Error fetching tournament", id, err);
          return null;
        }
      };

      for (let i = 1; i <= count; i++) {
        promises.push(fetchTournamentDetails(i));
      }

      try {
        const results = await Promise.all(promises);
        const validTournaments = results.filter((t) => t !== null);
        setTournaments(validTournaments);
        
        // Set error state if the count was > 0 but we failed to fetch any valid tournaments
        if (count > 0 && validTournaments.length === 0) {
            setErrorFetching(true);
        }

      } catch (err) {
        // Catch block for Promise.all failure (less common, as individual errors are caught above)
        console.error("Promise.all failed to complete:", err);
        setErrorFetching(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [tournamentCount, isCountLoading]);

  // Handle Loading/Error States outside of the main return block

  if (loading) {
    return <p className="text-center mt-20 text-white">Loading tournaments...</p>;
  }

  // 🛑 The main fix: Check for both initial count error OR subsequent fetching error
  if (isCountError || (errorFetching && tournaments.length === 0)) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-white">
        <h1 className="text-4xl font-bold mb-10 text-center">Tournament Dashboard</h1>
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border-2 border-red-600 rounded-lg p-10 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              {isCountError ? "Connection Error" : "No Events Found"}
            </h2>
            <p className="text-gray-400">
              {isCountError
                ? "Could not connect to the network or fetch the initial count."
                : "We couldn't find any active tournaments on the smart contract."}
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Handle the case where the count is 0 (or no valid tournaments were found)
  if (tournaments.length === 0) {
      return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            <h1 className="text-4xl font-bold mb-10 text-center">Tournament Dashboard</h1>
            <p className="text-center mt-20 text-gray-400 text-xl">
                No tournaments have been created yet. Check back soon!
            </p>
        </div>
      );
  }

  // Main Display
  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Tournament Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {tournaments.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition duration-300"
            >
              {t.logoBase64 && (
                <img
                  src={t.logoBase64}
                  alt={t.name}
                  className="w-32 h-32 object-cover rounded-full mb-4 border border-red-600"
                />
              )}
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <p className="text-gray-400 text-sm text-center mb-2">{t.desc}</p>
              <p className="font-medium">Prize Pool: {t.prize}</p>
              <p>Status: {t.status}</p>
              <p>Date: {t.date}</p>
              <p>Players: {t.playerCount}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}