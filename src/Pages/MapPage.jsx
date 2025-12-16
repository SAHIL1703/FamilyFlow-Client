import React from 'react'
import Navbar from '../components/NavbarComponent/Navbar'
import MapDirections from '../components/MapPageComponent/MapDirections'
import RoomMemberMap from '../components/MapPageComponent/RoomMemberMap'

const MapPage = () => {
  return (
    <div>
        <Navbar />
        {/* <MapDirections /> */}
        <RoomMemberMap />
    </div>
  )
}

export default MapPage