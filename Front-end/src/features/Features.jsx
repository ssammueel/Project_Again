import React from 'react'
import { Header } from '../Components/Header'
import { Link, Outlet } from 'react-router-dom'
import { Footer } from '../Components/Footer'

export const Features = () => {
  return (
    <>
      <Header/>

      <div className='mt-[58px] bg-slate-50'>
        <div className='flex w-[100%]'>

        <section className="w-[17%] p-[2%]">
          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Nmap Scans</summary>
              <ul className='flex flex-col gap-1'>
                 
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>PortScan</li></Link>
                  <Link to='tcpScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>TCP Scan</li></Link>
                  <Link to='UdpScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>UDP Scan</li></Link>

                  <Link to='SynScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>SynScan</li></Link>                  
                  <Link to='TracerouteScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>TracerouteScan</li></Link>                
          
                  <Link to='detectos'><li className='text-[16px] pl-5 pt-0 link link-hover'>OS Detection</li></Link>
                  <Link to='ServiceSca'><li className='text-[16px] pl-5 pt-0 link link-hover'>Service Detection</li></Link>
                  <Link to='SubnetScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>SubnetScan..</li></Link>                  
                
                  <Link to='VulnScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>VulnScan</li></Link>
                  <Link to='AggressiveScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>AggressiveScan</li></Link>
                  <Link to='FirewallScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>FirewallScan</li></Link>
      

                <Link to='CustomScan'>
                  <li className='w-fit p-1 text-[15px] mt-3 link link-hover outline-slate-950 bg-slate-300 rounded-lg'>Custom Commands</li>
                </Link>
              </ul>
          </details>

          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Web applications</summary>
            <ul>
            <Link to='NiktoScan'><li className='text-[14px] pl-5 pt-0 link link-hover'>Nikto Scans</li></Link>
            </ul>
          </details>

          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Nmap Scans</summary>
          </details>

          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Nmap Scans</summary>
          </details>

          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Nmap Scans</summary>
          </details>
        </section>


          <section className="border-1 outline outline-5 outline-blue-500 w-[63%] h-[100vh] p-[1%] flex gap-[2%]">
    
            <Outlet/>
          </section>

          <section className="w-[20%] bg-black p-[2%]">
            <h1>short manual</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quibusdam quas. Maiores dolore beatae, laudantium unde quos odit voluptatem veritatis! Reprehenderit eligendi maxime sapiente asperiores? Consectetur sit quos rem illo!</p>

          </section>
        </div>
          
      </div>
      
    </>
  )
}
