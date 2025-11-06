import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CalendarPage from './pages/CalendarPage'
import FinalePage from './pages/FinalePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/finale" element={<FinalePage />} />
      </Routes>
    </Router>
  )
}

export default App

