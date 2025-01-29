import React from 'react'
import { Scan } from './Scan'
import { Header } from './Header'
import { AutoCarousel } from './AutoCarousel'

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

        {/* #footer */}
        <section className='bg-none'>
  
          <footer className="footer bg-base-300 text-base-content p-20">
            <nav>
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
              <h6 className="footer-title">Social</h6>
              <div className="grid grid-flow-col gap-4">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current">
                    <path
                      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current">
                    <path
                      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current">
                    <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </nav>
          </footer>
        </section>
        
        
    </div>
  )
}
