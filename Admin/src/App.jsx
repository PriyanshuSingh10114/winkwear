import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import bgIntro from './assets/bgIntro.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App
