import React, { useState } from 'react';
import { Header } from '../Components/Header';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../Components/Footer';

export const Features = () => {
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState('nmap'); // 'nmap' or 'web'
  
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className='mt-[2%] min-h-screen flex flex-col w-full bg-[#051c2e]'>
      <Header />
      
      <div className='flex w-full flex-1 mt-[50px]'>
        {/* Light Sidebar */}
        <section className="w-64 min-w-[16rem] p-4 bg-[#efeff1] m-4 h-[calc(100vh-50px)] overflow-y-auto sticky top-[50px] shadow-m rounded-r-xl ">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => setActiveGroup('nmap')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-all ${
                  activeGroup === 'nmap' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Network Tools
              </button>
              <button
                onClick={() => setActiveGroup('web')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-all ${
                  activeGroup === 'web' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Web Scanners
              </button>
            </div>
          </div>

          {activeGroup === 'nmap' && (
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2 font-semibold">Network Scans</h3>
              <ul className='space-y-1'>
                {[
                  { to: 'ptScan', name: 'Port Scan', color: 'blue' },
                  { to: 'SynScan', name: 'Syn Scan', color: 'blue' },
                  { to: 'TracerouteScan', name: 'Traceroute Scan', color: 'blue' },
                  { to: 'FirewallScan', name: 'Firewall Scan', color: 'blue' },
                  { to: 'AggressiveScan', name: 'Aggressive Scan', color: 'blue' },
                  { to: 'CustomScan', name: 'Custom Scans', color: 'blue' }
                ].map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                        isActive(item.to) 
                          ? `bg-[#dedef1] text-${item.color}-700 font-bold  border-l-4 border-blue-500` 
                          : 'text-black hover:bg-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-${item.color}-400 mr-3`}></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeGroup === 'web' && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-2 font-semibold">Web Scans</h3>
              <ul className='space-y-1'>
                {[
                  { to: 'GeneralScans', name: 'General Scans', color: 'green' },
                  { to: 'HeaderScan', name: 'Headers Scan', color: 'green' },
                  { to: 'FileUploadScan', name: 'File Upload Scan', color: 'green' },
                  { to: 'OutdatedSoftwareScan', name: 'Outdated Software', color: 'green' }
                ].map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                        isActive(item.to) 
                          ? `bg-[#dedef1] text-${item.color}-700 font-bold  border-l-4 border-blue-500` 
                          : 'text-black  hover:bg-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full bg-${item.color}-400 mr-3`}></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Main Content */}
        <section className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-100px)] border border-gray-200">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  )
}