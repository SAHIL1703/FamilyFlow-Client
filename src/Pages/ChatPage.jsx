import React, { useContext } from 'react'
import Navbar from '../components/NavbarComponent/Navbar'
import ChatDashboard from '../components/ChatPageComponent/ChatDashboard'
import { AppContext } from '../context/AppContext'

const ChatPage = () => {
  return (
    <div>
        <Navbar />
        <ChatDashboard />
    </div>
  )
}

export default ChatPage