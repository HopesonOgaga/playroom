import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./db/dashboard";
import HOME from "./page/home";
import CreateTournament from "./db/createtournament";
import TournamentDashboard from "./db/tournaments";
import PlayerTournaments from "./components/players";
import LearnMore from "./components/faq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<CreateTournament />} />
        <Route path="/TournamentDashboard" element={<TournamentDashboard />} />
        <Route path="/players" element={<PlayerTournaments/>}/>
        <Route path ="/faq" element ={<LearnMore/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
