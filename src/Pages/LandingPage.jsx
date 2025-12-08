import React from 'react'
import Navbar from '../components/LandingPageComponent/Navbar'
import Hero from '../components/LandingPageComponent/Hero'
import Buttons from '../components/LandingPageComponent/Buttons'
import Card from '../components/LandingPageComponent/Card'
import Feature from '../components/LandingPageComponent/Features/Feature'
import Working from '../components/LandingPageComponent/Working'

const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Buttons />
        <Card />
        <Feature />
        <Working />
    </div>
  )
}

export default LandingPage