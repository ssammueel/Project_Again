import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    if (userDataString && userDataString !== "undefined") {
      const userData = JSON.parse(userDataString);
      setUser(userData.name);  // Ensure 'name' is correct according to your user data structure
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the stored token
    localStorage.removeItem('user');   // Remove the stored user data
    setUser(null);                     // Clear user state in the Header component
    window.location.href = '/login';   // Redirect to the login page (optional)
  };
  
    

  return (
    <div>
      <section className='fixed z-10 bg-white top-0 w-full p-[1%] flex gap-[3%] border-1 shadow-sm shadow-gray-500 '>
        <h1 className='w-[19%] pl-10 font-bold text-2xl'>NPAP</h1>
        <div className="w-[55%] h-5">
        <ul className='flex justify-between text-xl'>
          <li><Link to="/home" className="link link-hover">Home</Link></li>
          <li><Link to="/features" className="link link-hover">Features</Link></li> {/* Fix this */}
          <li><Link to="/documentation" className="link link-hover">Documentations</Link></li>
          <li><Link to="/news" className="link link-hover">News</Link></li>
          <li><Link to="/history" className="link link-hover">History</Link></li> {/* Fix this */}
        </ul>
          </div><div className="w-[20%] h-5 flex justify-center gap-6 relative">
  <div className="avatar flex justify-center w-10 h-10">
    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
      <img src='./images/mwende.jpg' alt="User Avatar" />
    </div>
  </div>
    
  <div className="relative">
    <h1 className="hover-trigger cursor-pointer">{user || "Guest"}</h1>
    <ul className="dropdown-menu hidden absolute mt-0 bg-white shadow-lg rounded">
      <li className="p-2 hover:bg-gray-200">
        <Link to='/changepic' className='block'>Change Pic</Link>
      </li>
      <li className="p-2 hover:bg-gray-200">
        <Link to="/changepassword" ><button  className='w-full text-left'>Change Password</button> </Link>
        {/* onClick={handlePasswordChange} */}
      </li>
      <li className="p-2 hover:bg-gray-200">
          <button onClick={handleLogout} className='w-full text-left'>Logout</button>
      </li>

    </ul>
  </div>
</div>

      </section>
    </div>
  );
};
