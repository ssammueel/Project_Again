import React from 'react'
import { Scan } from '../Components/Scan'
import { Header } from '../Components/Header'
import { AutoCarousel } from '../Components/AutoCarousel'
import { Footer } from '../Components/Footer'

export const Home = () => {
  return (
    <div className='bg-slate-50 h-[100%]'>

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
        
        <section className="p-6 font-sans text-black bg-white bg-opacity-90 rounded-lg shadow-lg w-[60%] mx-auto mb-4">
            <div className="text-[24px] font-bold mb-4">Tools Used in Exploitation Search</div>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <span className="font-semibold">Exploit Database (SearchSploit):</span> 
                A collection of publicly available exploits used to search and identify relevant exploits for vulnerabilities found during scanning. 
                It connects vulnerabilities to potential exploitation techniques.
              </li>
              <li>
                <span className="font-semibold">Python Subprocess:</span> 
                Allows the backend to execute system commands like running SearchSploit to query the Exploit Database efficiently.
              </li>
              <li>
                <span className="font-semibold">Flask:</span> 
                Acts as the backend framework to handle requests and provide JSON responses for the exploit search results.
              </li>
              <li>
                <span className="font-semibold">Fetch API:</span> 
                Used in the frontend to send queries and retrieve exploit search results from the backend.
              </li>
              <li>
                <span className="font-semibold">DaisyUI:</span> 
                Provides a clean, responsive, and modern UI for presenting exploit search functionality and results.
              </li>
            </ul>
          </section>
    </div>
  )
}
