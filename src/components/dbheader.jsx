// import React from "react";
// import { Link } from "react-router-dom";
// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { injected } from "wagmi/connectors";

// export default function DBNav() {
//   const { address, isConnected } = useAccount();
//   const { connect } = useConnect({
//     connector: new InjectedConnector(),
//   });
//   const { disconnect } = useDisconnect();

//   return (
//     <nav className="w-full bg-gray-900 py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-50">
//       {/* Left - Links */}
//       <ul className="flex gap-8 items-center">
//         <li>
//           <Link
//             to="/"
//             className="text-white font-bold text-xl hover:text-[#ff7c7c] transition"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/TournamentDashboard"
//             className="text-white font-medium hover:text-[#ff7c7c] transition"
//           >
//             Events
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/players"
//             className="text-white font-medium hover:text-[#ff7c7c] transition"
//           >
//             Players
//           </Link>
//         </li>
//       </ul>

//       {/* Right - MetaMask */}
//       <div>
//         {isConnected ? (
//           <button
//             onClick={() => disconnect()}
//             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//           >
//             Disconnect
//           </button>
//         ) : (
//           <button
//             onClick={() => connect()}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Connect Wallet
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
