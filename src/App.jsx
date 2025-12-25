import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CalendarPage from './pages/CalendarPage'
import FinalePage from './pages/FinalePage'

function App() {
  // GitHub Pages için base path (vite.config.js'deki base ile aynı olmalı)
  const basename = import.meta.env.BASE_URL || '/Yeni-y-lda-sevgilinizle-e-lenin/'

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/finale" element={<FinalePage />} />
      </Routes>
    </Router>
  )
}

export default App

