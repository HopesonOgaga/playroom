import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./db/dashboard"
import HOME from "./page/home"
import CreateTournament from "./db/events"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<CreateTournament></CreateTournament>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
