import React from 'react';
import { DocNmap } from './DocNmap';

export const Documentation = () => {
  return (
    <div className="p-10 mt-10 bg-slate-50 text-gray-800 min-h-screen">

      {/* documentation header  */}
      <div className='flex gap-10 px-[100px]'>
        <h1 className="text-4xl font-bold text-sky-700 mb-6">📖 Documentation</h1>
        <ul className='text-xl font-bold text-sky-700 mb-6 flex gap-4'>
            <li>nmap</li>
            <li>nickto</li>
            <li>nmap</li>
            <li>nickto</li>
          </ul>
      </div>

      {/* Nmap Section */}
      <DocNmap/>
    </div>
  );
};
