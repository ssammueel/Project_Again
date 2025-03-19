import React from 'react'
import { Header } from '../Components/Header'
import { Link, Outlet } from 'react-router-dom'
import { Footer } from '../Components/Footer'

export const Features = () => {
  return (
    <div className='min-h-screen flex flex-col w-[100%]'>

      <Header/>
      <div className='mt-[50px] bg-slate-50'>
      
        <div className='flex w-[100%] h-screen'>

          <section className="w-[17%] m-7 p-[2%] bg-[#ebe9e9] h-[calc(100vh-50px)] overflow-y-auto sticky top-[50px] shadow-[#464746] shadow-md rounded-md"> 
              
                {/* nmap  */}
                <ul className='flex flex-col gap-2'>
                  
                    <Link to='ptScan'><li className='text-[16px] border-l-4 border-[#f02626] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text-[#02080a] link link-hover'>PortScan</li></Link>
                    <Link to='SynScan'><li className='text-[16px] border-l-4 border-[#ee9228] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text-[#02080a] link link-hover'>SynScan</li></Link>                  
                    <Link to='TracerouteScan'><li className='text-[16px] border-l-4 border-[#28d0ee] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text--[#02080a]link link-hover'>TraceRtScan</li></Link>                
          
                    <Link to='FirewallScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text-[#02080a] link link-hover'>FirewallScan</li></Link>
                    <Link to='AggressiveScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text-[#02080a] link link-hover'>AggressiveScan</li></Link>
                    <Link to='CustomScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#4cd830] to-[#0276a3]  text-[#02080a] link link-hover'>Custom Scans</li></Link>
            
                </ul>
                  
                 {/* nickto web */}
                {/* <p className='w-[110%] text-[2px] mt-3 bg-black'>..</p>` */}
                <ul className='mt-5 flex flex-col gap-1'>
                
                  <Link to='GeneralScans'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-green-600 to-green-900  text-[#f0f2f3] link link-hover'>General scans</li></Link>
                  <Link to='HeaderScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-green-600 to-green-900  text-[#f0f2f3] link link-hover'>Headers Scan</li></Link>

                  <Link to='FileUploadScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-green-600 to-green-900  text-[#f0f2f3] link link-hover'>fileupload</li></Link>                  
                  <Link to='OutdatedSoftwareScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-green-600 to-green-900  text-[#f0f2f3] link link-hover'>Outdatedsw</li></Link>
                </ul>     

  {/* hydra  */}
            
              {/* <p className='w-[110%] text-[2px] mt-3 bg-black'>..</p>`
              <ul className='flex flex-col gap-1'>

              <Link to='SSHBruteforce'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>ssh_bruteforce</li></Link>
                <Link to='FTPBruteforce'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>FTPBruteforce</li></Link>
              <Link to='MySQLBruteforce'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>MySQLBruteforce</li></Link>

              <Link to='RDPBruteforce'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>DPBruteforce</li></Link>
              <Link to='CustomBruteforce'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>customBruteforce.</li></Link>

              </ul> */}
            

  {/* sql scan  */}
              {/* <p className='w-[110%] text-[2px] mt-3 bg-black'>..</p>`
              <ul className='flex flex-col gap-1'>

                <Link to='BasicScan'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>BasicScan</li></Link>
                <Link to='DbEnum'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>DBEnum</li></Link>

                <Link to='TableExtract'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>TableExtract</li></Link>
                <Link to='CustomSQL'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>CustomSQL</li></Link>
              
              </ul> */}

  {/* wifi cracking  */}
              {/* <p className='w-[110%] text-[2px] mt-3 bg-black'>..</p>`
              <ul className='flex flex-col gap-1'>

                <Link to='ScanNetworks'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>networkScan</li></Link>
                <Link to='CaptureHandshake'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>CaptureHandshake</li></Link>
                <Link to='CrackPassword'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>CrackPassword</li></Link>
                <Link to='DeauthAttack'><li className='text-[16px] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#999d9e] to-[#a5083c]  text-[#f0f2f3] link link-hover'>DeauthAttack</li></Link>
              </ul> */}

          </section>

          <section className="border-1  w-[74%] h-[100%] p-[1%] flex gap-[4%]"> 
             <Outlet/>
          </section>

        </div>
          
      </div>
      <div>
      </div>
      
      
    </div>
  )
}
