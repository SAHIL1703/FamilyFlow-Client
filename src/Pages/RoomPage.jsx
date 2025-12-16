import React from 'react'
import Navbar from '../components/NavbarComponent/Navbar'
import Form from '../components/RoomPageComponent/Form'
import RoomDashboard from '../components/RoomPageComponent/RoomDashboard'


const RoomPage = () => {
  return (
    <div>
        <Navbar />
        <Form />
        <RoomDashboard />

    </div>
  )
}

export default RoomPage