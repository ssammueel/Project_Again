import React from 'react'
import { Header } from '../Components/Header'
import { Link, Outlet } from 'react-router-dom'
import { Footer } from '../Components/Footer'

export const Features = () => {
  return (
    <>
      <Header/>

      <div className='mt-[35px] bg-slate-50'>
        <div className='flex w-[100%]'>

        <section className="w-[17%] p-[2%] outline outline-2 outline-blue-500">
{/* nmap  */}
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
 
{/* nickto web */}
        <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>NIkto Scans</summary>
              <ul className='flex flex-col gap-1'>
                 
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>General scans</li></Link>
                  <Link to='tcpScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>ssl scans</li></Link>
                  <Link to='UdpScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Headers Scan</li></Link>

                  <Link to='SynScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>fileupload Scan</li></Link>                  
                  <Link to='TracerouteScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Outdated Software</li></Link>                
          
                  <Link to='detectos'><li className='text-[16px] pl-5 pt-0 link link-hover'>Admin pannel</li></Link>
                  <Link to='ServiceSca'><li className='text-[16px] pl-5 pt-0 link link-hover'>Custom Scan</li></Link>
              </ul>
          </details>

{/* metasploit integration */}
          <details>
            <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Metaspoit</summary>
            <ul className='flex flex-col gap-1'>
                 
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Exploits</li></Link>
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Scanners</li></Link>
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Post Exploitation</li></Link>

                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'> Persistence</li></Link>
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>MSF RPC</li></Link> 
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Payloads</li></Link>

                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>auxiliary</li></Link>
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>Listeners</li></Link>
                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>reporting</li></Link>

                  <Link to='ptScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>automation</li></Link>
            </ul>
          </details>

{/* hydra  */}
          <details>
          <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Hydra</summary>
            <ul className='flex flex-col gap-1'>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>ssh_bruteforce</li></Link>
              <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>FTPBruteforce</li></Link>
            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>MySQLBruteforce</li></Link>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>DPBruteforce</li></Link>
            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>ustomBruteforce.</li></Link>

            </ul>
          </details>

{/* sql scan  */}
          <details>
          <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>SQL vunerability</summary>
            <ul className='flex flex-col gap-1'>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>BasicScan</li></Link>
              <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>DBEnum</li></Link>
            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>TableExtract</li></Link>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>CustomSQL</li></Link>
            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>ustomBruteforce.</li></Link>

            </ul>
          </details>

{/* wifi cracking  */}
          <details>
          <summary className='text-blue-700 text-[18px] p-0 cursor-pointer'>Wifi Cracking</summary>
            <ul className='flex flex-col gap-1'>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>networkScan</li></Link>
              <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>CaptureHandshake</li></Link>
            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>CrackPassword</li></Link>

            <Link to='NiktoScan'><li className='text-[16px] pl-5 pt-0 link link-hover'>DeauthAttack</li></Link>
            </ul>
          </details>

        </section>


          <section className="border-1  w-[63%] h-[100%] p-[1%] flex gap-[2%]"> 
           <Outlet/>
          </section>

          <section className="w-[20%] bg-f p-[2%] outline outline-2 outline-blue-500">
            <h1>short manual</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quibusdam quas. Maiores dolore beatae, laudantium unde quos odit voluptatem veritatis! Reprehenderit eligendi maxime sapiente asperiores? Consectetur sit quos rem illo!</p>

          </section>
        </div>
          
      </div>
      
    </>
  )
}
