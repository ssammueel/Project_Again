import React from 'react'
import { AutoCarousel } from '../Components/AutoCarousel'
import { Ex_tools } from './Ex_tools'
import { SecurityFeatures } from './SecurityFeatures'
import { LearningResources } from './LearningResources'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='mt-[1%] bg-gradient-to-b from-[#f8f5f5] to-[#031d3f] min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Hero Section */}
        <section className='pt-20 pb-16 md:flex items-center justify-between gap-12'>
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Welcome to Npapa Security Platform
              </span> 
            </h1>
      
            <p className="text-black text-lg leading-relaxed mb-6">
              In today's evolving threat landscape, organizations face sophisticated cyber attacks daily. 
              Our enterprise-grade security platform provides comprehensive vulnerability assessment, 
              penetration testing, and continuous monitoring to protect your critical assets.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to='/features'><button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Start Free Scan
              </button></Link>
              {/* <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Request Demo
              </button> */}
            </div>
          </div>

          <div className='md:w-1/2 h-96 md:h-[32rem] rounded-xl overflow-hidden shadow-xl border border-gray-200'>
            <AutoCarousel/>
          </div>
        </section>

        {/* Security Features Section */}
        {/* <SecurityFeatures /> */}

        {/* Tools Section */}
        <section className='py-12'>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Comprehensive Security Toolkit
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our platform integrates industry-standard tools with proprietary enhancements
            to deliver unmatched security testing capabilities
          </p>
          <Ex_tools/>
        </section>

        {/* Learning Resources */}
        {/* <LearningResources /> */}
      </div>
    </div>
  )
}