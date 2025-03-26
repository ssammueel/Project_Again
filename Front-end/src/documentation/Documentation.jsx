import React, { useState } from 'react';
import { DocNmap } from './DocNmap';
import { DocHydra } from './DocHydra';

export const Documentation = () => {
  const [activeTab, setActiveTab] = useState('Nmap');

  return (
    <div className="mt-[5%] p-4 md:p-6 bg-[#051c2e] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header with Functional Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#ffff] flex items-center gap-2">
            <span className="bg-blue-600 text-white p-1.5 rounded-md">📖</span>
            Platform Documentation
          </h1>
          
          {/* Working Tab Navigation */}
          <div className="flex bg-white p-0.5 rounded-md shadow-xs border border-gray-200">
            {['Nmap', 'Hydra'].map((tool) => (
              <button
                key={tool}
                onClick={() => setActiveTab(tool)}
                className={`px-3 py-1.5 text-sm md:text-base rounded-[4px] font-medium transition-colors ${
                  activeTab === tool 
                    ? 'bg-blue-600 text-white shadow-inner' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Tool Rendering */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'Nmap' ? <DocNmap /> : <DocHydra />}
        </div>
      </div>
    </div>
  );
};