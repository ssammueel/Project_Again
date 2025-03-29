import React from 'react';
import { FaTwitter, FaYoutube, FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoCall } from 'react-icons/io5';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">NPAPA</h3>
            <p className="text-gray-400">
            .. The best defense is a good offense
            <br/>... Hackers dont break in—they log in.
            <br/>.... Stay secure Stay ahead
            </p>
            <div className="flex space-x-4">
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Social Media</h4>
            <ul className="space-y-2">
              <li className='flex gap-3'>
                <a href="https://github.com/ssammueel" className="text-gray-400 hover:text-white transition-colors"><FaGithub size={20} /></a>
                <p className='font-bold'>GitHub</p>
              </li>
              <li className='flex gap-3'>
                <a href="https://x.com/SamMumo200?t=dPlxnRRtf09N0IaNoFPgww&s=09" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
                <p className='font-bold'>Twitter</p>
              </li>
              <li className='flex gap-3'>
                <a href="https://www.linkedin.com/in/sam-mumo-sign-713081262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={23} /></a>
                <p className='font-bold'>LinkedIn</p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MdEmail className="text-gray-400" />
                <span className="text-gray-400">signfforce@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <IoCall className="text-gray-400" />
                <span className="text-gray-400">+254 (0101) 359-459</span>
              </li>
              <li className="text-gray-400">
                Security Avenue, Cyb3rHun73rs
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-2"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} NPAPA. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};