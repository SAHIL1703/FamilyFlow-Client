import React, { useContext, useState, useEffect } from 'react'
import CreateMember from '../components/DashboardPageComponent/CreateMember'
import GoCards from '../components/DashboardPageComponent/GoCards'
import RoomsActivity from '../components/DashboardPageComponent/RoomsActivity'
import OnlineMembers from '../components/DashboardPageComponent/OnlineMembers'
import Invitations from '../components/DashboardPageComponent/Invitations'
import Navbar from '../components/NavbarComponent/Navbar'
import { AppContext } from '../context/AppContext'

const DashboardPage = () => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a global loading state or wait for user context
  useEffect(() => {
    if (user) {
      // Small delay to ensure child components have started their fetches
      // or you can pass a callback to children to notify when they are done
      setIsLoading(false);
    }
  }, [user]);

  // 1. Create a "Skeleton" placeholder to prevent layout shift
  const Skeleton = ({ height }) => (
    <div className={`w-full ${height} bg-gray-200 animate-pulse rounded-xl mb-4`}></div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* If loading, show a skeleton of roughly the same height as CreateMember */}
        {isLoading ? <Skeleton height="h-32" /> : <CreateMember />}
        
        <GoCards />
        
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
          
          {/* Left Side: Rooms Activity */}
          <div className="md:col-span-2 xl:col-span-3">
            {isLoading ? <Skeleton height="h-96" /> : <RoomsActivity />}
          </div>

          {/* Right Side: Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6 h-fit sticky top-6">
             <div className="w-full">
                {isLoading ? <Skeleton height="h-48" /> : <Invitations />}
             </div>
             <div className="w-full">
                {isLoading ? <Skeleton height="h-64" /> : <OnlineMembers />}
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardPage;