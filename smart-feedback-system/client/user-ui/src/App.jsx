// App.jsx
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/HomeScreen'

import { ThemeProvider } from './ThemeContext'
import FeedBackScreen from './pages/FeedBackScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FeedBack" element={<FeedBackScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
