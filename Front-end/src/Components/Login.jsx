import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCred(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cred)
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setMsg("Login successful");
        localStorage.setItem("token", data.token);  // Assuming token handling
        localStorage.setItem("user", JSON.stringify(data.user));  // Store user data
        navigate("/features");  // Redirect after login
      }
       else {
        setMsg(data.message || "Login failed");
      }

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex justify-center p-5 mt-7'>
      <form className='bg-slate-300 flex flex-col px-3 py-10 gap-3 w-[30%] rounded' onSubmit={handleSubmit}>
        Email:
        <input
          className='bg-white p-2 indent-3 outline-none rounded-btn'
          type='text'
          name='email'
          placeholder='Enter Email'
          value={cred.email}
          onChange={handleInput}
        />
        Password:
        <input
          className='bg-white p-2 indent-3 outline-none rounded-btn'
          type='password'
          name='password'
          placeholder='Enter Password'
          value={cred.password}
          onChange={handleInput}
        />
        <button type='submit' className="btn btn-accent w-fit px-5">Log In</button>
        <p>Don’t have an account? <Link className="link link-primary" to="/register">Register</Link></p>
        <p className='good px-4'>{msg}</p>
      </form>
    </div>
  );
}
