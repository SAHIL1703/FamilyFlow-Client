import React from 'react'
import Navbar from '../components/LandingPageComponent/Navbar'
import Hero from '../components/LandingPageComponent/Hero'
import Buttons from '../components/LandingPageComponent/Buttons'
import Card from '../components/LandingPageComponent/Card' // The 3-column highlights
import Feature from '../components/LandingPageComponent/Features/Feature' // The detailed 8-grid
import Working from '../components/LandingPageComponent/Working'
import Footer from '../components/LandingPageComponent/Footer'

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
        <Navbar />
        <Hero />
        <Buttons />
        <Card />
        <Feature />
        <Working />
        <Footer />
    </div>
  )
}

export default LandingPage