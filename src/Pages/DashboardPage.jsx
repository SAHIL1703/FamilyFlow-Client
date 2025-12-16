import React from 'react'
import CreateMember from '../components/DashboardPageComponent/CreateMember'
import GoCards from '../components/DashboardPageComponent/GoCards'
import RoomsActivity from '../components/DashboardPageComponent/RoomsActivity'
import OnlineMembers from '../components/DashboardPageComponent/OnlineMembers'
import Invitations from '../components/DashboardPageComponent/Invitations'
import Navbar from '../components/NavbarComponent/Navbar'

const DashboardPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <CreateMember />
            <GoCards />
            
            {/* --- Main Responsive Grid --- 
                1. grid-cols-1 (Mobile): Everything stacked.
                2. md:grid-cols-3 (Tablet): Rooms take 2 cols, Sidebar takes 1 col.
                3. xl:grid-cols-4 (Desktop): Rooms take 3 cols, Sidebar takes 1 col.
            */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
              
              {/* Left Side: Rooms Activity */}
              {/* Takes 2 cols on tablet, 3 cols on desktop */}
              <div className="md:col-span-2 xl:col-span-3">
                <RoomsActivity />
              </div>

              {/* Right Side: Sidebar (Invitations + Online) */}
              {/* Takes 1 col on tablet/desktop */}
              <div className="md:col-span-1 flex flex-col gap-6 h-fit sticky top-6 ">
                 
                 {/* 1. Invitations (Prioritized at top of sidebar) */}
                 <div className="w-full">
                    <Invitations />
                 </div>

                 {/* 2. Online Members */}
                 <div className="w-full">
                    <OnlineMembers />
                 </div>

              </div>
              
            </div>
        </div>
        
    </div>
  )
}

export default DashboardPage