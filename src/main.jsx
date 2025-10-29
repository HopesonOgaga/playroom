import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// You may need to rename this import to match your actual file path (e.g., './config/wagmi.js')
import config from "./wagmiConfig"; 
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
// import { BrowserRouter } from 'react-router-dom'; // ❌ REMOVED: This was causing the error.

// 1. Initialize the QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap your application with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {/* 3. We removed <BrowserRouter> here. 
          The App component (or its parent) must now contain the router setup.
        */}
        <App />
      </WagmiProvider>
    </QueryClientProvider>
  </StrictMode>
);