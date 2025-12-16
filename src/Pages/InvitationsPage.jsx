import React from 'react'
import Navbar from '../components/NavbarComponent/Navbar.jsx'
import InviteDashboard from '../components/InvitationPageComponent/InviteDashboard.jsx'
import UserInvite from '../components/InvitationPageComponent/UserInvite.jsx'
const InvitationsPage = () => {
  return (
    <div>
      <Navbar />
      <InviteDashboard />
      <UserInvite />
    </div>
  )
}

export default InvitationsPage