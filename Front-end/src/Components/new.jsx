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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
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

      setTimeout(() => setMsg(""), 2000);

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
    <div className='flex justify-center p-5'>
      <form className='bg-slate-300 flex flex-col p-3 gap-3 w-[30%] rounded' onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id='nameInput'
            className='bg-white p-2 indent-3 outline-none rounded-btn'
            type='text'
            name='name'
            placeholder='Enter Name'
            value={userDetails.name}
            onChange={handleInput}
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('emailInput'))}
          />
        </label>

        <label>
          Email:
          <input
            id='emailInput'
            className='bg-white p-2 indent-3 outline-none rounded-btn'
            type='email'
            name='email'
            placeholder='Enter Email'
            value={userDetails.email}
            onChange={handleInput}
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('passwordInput'))}
          />
        </label>

        <label>
          Password:
          <input
            id='passwordInput'
            className='bg-white p-2 indent-3 outline-none rounded-btn'
            type='password'
            name='password'
            placeholder='Enter Password'
            value={userDetails.password}
            onChange={handleInput}
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('confirmInput'))}
          />
        </label>

        <label>
          Confirm Password:
          <input
            id='confirmInput'
            className='bg-white p-2 indent-3 outline-none rounded-btn'
            type='password'
            name='confirm'
            placeholder='Re-enter Password'
            value={userDetails.confirm}
            onChange={handleInput}
          />
        </label>

        <button type='submit' id='submitButton' className="btn btn-accent w-fit px-5">Register</button>

        <p>Already have an account? <Link className="link link-primary" to="/login">Log-In</Link></p>
        <p className='good'>{msg}</p>
      </form>
    </div>
  );
};
