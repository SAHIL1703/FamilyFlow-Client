import React from 'react'
import Navbar from '../components/LandingPageComponent/Navbar'
import Hero from '../components/LandingPageComponent/Hero'
import Buttons from '../components/LandingPageComponent/Buttons'
import Card from '../components/LandingPageComponent/Card'

const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Buttons />
        <Card />
    </div>
  )
}

export default LandingPage