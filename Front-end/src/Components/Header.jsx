import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataString = localStorage.getItem('user');

    if (token && userDataString && userDataString !== "undefined") {
      const userData = JSON.parse(userDataString);
      setUser(userData);  
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with subtle gradient */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/home" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              NPAPA
            </Link>
          </div>

          {/* Navigation Links with animated underline */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home" 
              className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium transition-colors group"
            >
              Home
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              to="/features" 
              className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium transition-colors group"
            >
              Features
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              to="/documentation" 
              className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium transition-colors group"
            >
              Documentation
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
            <Link 
              to="/history" 
              className="relative text-gray-700 hover:text-blue-600 px-3 py-2 text-lg font-medium transition-colors group"
            >
              History
              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-3/4"></span>
            </Link>
          </nav>

          {/* User Profile Section with modern dropdown */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium text-gray-700">
                    {user?.name || user?.username || 'User'}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu with glass morphism effect */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100 backdrop-blur-sm bg-opacity-90">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">{user?.email || 'No email'}</p>
                    </div>
                    <Link 
                      to="/changepassword" 
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};