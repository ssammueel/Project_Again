import React from 'react'
import { Scan } from '../Components/Scan'
import { Header } from '../Components/Header'
import { AutoCarousel } from '../Components/AutoCarousel'
import { Footer } from '../Components/Footer'
import { Ex_tools } from './Ex_tools'

export const Home = () => {
  return (
    <div className='bg-gradient-to-r from-[#c4d9f4] to-[#edf2f4] h-[100%]'>

        <section className='mt-[58px] py-[1%] px-[1%] pr-[10%] flex'>

          <div className="p-[5%] font-sans text-black text-[20px] w-[55%] leading-relaxed ">
            <h2 className="text-2xl font-bold text-fuchsia-700 mb-4">
              Welcome to Npapa
            </h2>
            <p>
              At Npapa, your security is our utmost priority. In today's digital landscape, 
              global organizations face constant threats from cyber risks. This platform is 
              designed to empower institutions, especially banks, by thoroughly testing their 
              infrastructure against potential security incidents.
            </p>
            <p className="mt-4">
              Our mission is to identify vulnerabilities that can be exploited in systems and 
              ensure that your organization is prepared to tackle evolving security challenges. 
              Together, we strive to create a safer digital environment.
            </p>
          </div>


          <div className='w-[45%] pt-[6%] h-full '>
            <AutoCarousel/>
          </div>
        </section>

        <section className='pb-5'>
          <Ex_tools/>
        </section>
        
          </div>
  )
}
