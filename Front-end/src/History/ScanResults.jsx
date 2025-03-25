import React, { useState } from "react";
import { PortRst } from "./port_rst";
import { Link, Outlet } from "react-router-dom";

export const ScanResults = () => {
  
  return (
  <div className="w-[100%] p-0 h-fit mt-[4%] bg-white flex">

    <div className="w-[17%] mx-3 my-3 p-[2%] bg-[#ebe9e9] h-[calc(100vh-50px)] overflow-y-auto sticky top-[50px] shadow-[#464746] shadow-md rounded-md">
      <ul className="flex flex-col gap-2">
        <Link to='port'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">Open Ports</li></Link>
        <Link to='Syn_history'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">Syn_Scans</li></Link>
        <Link to='TracertHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">TracertHistory</li></Link>
        <Link to='FirewallHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">FirewallHistory</li></Link>
        <Link to='AggHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">AggHistory</li></Link>
        <Link to='CustomHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">CustomHistory</li></Link>

        <Link to='Generalhistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">General Scan</li></Link>
        <Link to='HeaderHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">Header Scan</li></Link>
        <Link to='FileHistory'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">FileUpload</li></Link>
        <Link to='Outdated'> <li className="p-2 bg-[#a3a0a0] w-[95%] flex justify-center rounded-2xl hover:bg-[#0f1047] hover:text-[#dddde0] hover:font-extrabold">OutdaterSW</li></Link>

      </ul>
    </div>

    <div className="w-[85%] mt-4">
      <Outlet/>
    </div>

  </div>
  );
};
