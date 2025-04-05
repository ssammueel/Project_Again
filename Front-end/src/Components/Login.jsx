import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    
    // Convert email to lowercase automatically
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    
    setCred(prev => ({ ...prev, [name]: processedValue }));
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/features");
      } else {
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
        <div className="relative">
          <input
            className='bg-white p-2 indent-3 outline-none rounded-btn w-full'
            type={showPassword ? "text" : "password"}
            name='password'
            placeholder='Enter Password'
            value={cred.password}
            onChange={handleInput}
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
        <button type='submit' className="btn btn-accent w-fit px-5">Log In</button>
        <p>Don't have an account? <Link className="link link-primary" to="/register">Register</Link></p>
        <p className='good px-4'>{msg}</p>
      </form>
    </div>
  );
}