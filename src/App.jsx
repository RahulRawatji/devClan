import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Comment from './pages/Comment'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='chat' element={<Chat />} />
          <Route path='comment' element={<Comment />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
