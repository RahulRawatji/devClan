import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {

  return (<>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login/>} />
    </Routes>
  </>

  )
}

export default App
