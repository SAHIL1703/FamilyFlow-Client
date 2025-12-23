import React from 'react'
import FeatureHeader from './FeatureHeader' // Renamed to avoid conflict
import FeatureGrid from './FeatureGrid'    // Renamed for clarity

const Feature = () => {
  return (
    <div className="bg-slate-50 py-24">
        <FeatureHeader />
        <FeatureGrid />      
    </div>
  )
}

export default Feature