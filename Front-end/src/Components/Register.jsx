import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [msg, setMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
    
    // Check password strength in real-time
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordError('');
      return;
    }
    
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Needs at least one uppercase letter');
      return;
    }
    
    if (!/[a-z]/.test(password)) {
      setPasswordError('Needs at least one lowercase letter');
      return;
    }
    
    if (!/[0-9]/.test(password)) {
      setPasswordError('Needs at least one number');
      return;
    }
    
    if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setPasswordError('Needs at least one special character');
      return;
    }
    
    setPasswordError('');
  };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
      });
      
      const data = await response.json();
      setMsg(data.message);
      
      setTimeout(() => {
        setMsg("");
      }, 2000);

      if (response.ok) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:", data);
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex justify-center p-5 mt-20'>
      <form className='bg-slate-300 flex flex-col p-6 gap-3 w-[30%] rounded-lg' onSubmit={handleSubmit}>

        Name :
        <input id='nameInput' className='bg-white p-2 indent-3 outline-none rounded-btn' type='text' name='name'
          placeholder='Enter Name' value={userDetails.name} onChange={handleInput}
          onKeyDown={(e) => handleKeyDown(e, document.getElementById('emailInput'))}
        />

        Email :
        <input id='emailInput' className='bg-white p-2 indent-3 outline-none rounded-btn' type='text' name='email'
          placeholder='Enter Email' value={userDetails.email} onChange={handleInput}
          onKeyDown={(e) => handleKeyDown(e, document.getElementById('passwordInput'))}
        />

Password :
<div className="relative">
  <input 
    id='passwordInput'
    className='bg-white p-2 indent-3 outline-none rounded-btn w-full'
    type={showPassword ? "text" : "password"}
    name='password'
    value={userDetails.password}
    placeholder='Enter Password'
    onChange={handleInput}
    onKeyDown={(e) => handleKeyDown(e, document.getElementById('confirmInput'))}
  />
  <button 
  type="button" 
  className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  )}
</button>
</div>
{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

Confirm :
<div className="relative">
  <input 
    id='confirmInput'
    className='bg-white p-2 indent-3 outline-none rounded-btn w-full'
    type={showPassword ? "text" : "password"}
    name='confirm'
    value={userDetails.confirm}
    placeholder='Re-enter Password'
    onChange={handleInput}
    onKeyDown={(e) => handleKeyDown(e, document.getElementById('submitButton'))}
  />
  <button 
  type="button" 
  className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? (
    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  )}
</button>
</div>

<button 
  type='submit' 
  id='submitButton' 
  className="btn btn-accent w-full px-5 mt-4"
>
  Register
</button>
        <p>Already have an account? <Link className="link link-primary" to="/login">Log-In</Link></p>
        <p className='good'>{msg}</p>
      </form>
    </div>
  );
}