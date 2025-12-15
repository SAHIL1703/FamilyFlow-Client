import React from 'react'
import Navbar from '../components/NavbarComponent/Navbar'
import CreateMember from '../components/DashboardPageComponent/CreateMember'
import GoCards from '../components/DashboardPageComponent/GoCards'

const DashboardPage = () => {
  return (
    <div>
        <Navbar />
        <CreateMember />
        <GoCards />
    </div>
  )
}

export default DashboardPage