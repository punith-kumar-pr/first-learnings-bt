import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/BT logo-1.png'; 

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showHomeForm, setShowHomeForm] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  
  useEffect(() => {
    // Cleanup function to clear the timeout 
    return () => {
      clearTimeout(sessionTimeout);
    };
  }, [sessionTimeout]);

  async function loginUser(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8090/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Received response:', response);
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const token = await response.json();
      console.log("123", token)

      if (token) {
        localStorage.setItem("token", token.token);
        alert("Login successful");

        // Start session timeout timer 
        const timeout = setTimeout(() => {
          const extendSession = window.confirm("Your session is about to expire. Do you want to extend it?");
          if (extendSession) {
            resetSessionTimeout();
          } else {
            logout();
          }
        }, 30000);
        setSessionTimeout(timeout);

        navigate('/searchForm');
      } else {
        alert("Check the email and password");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check your email and password.');
    }
  }

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeout);
    const timeout = setTimeout(() => {
      const extendSession = window.confirm("Your session is about to expire. Do you want to extend it?");
      if (extendSession) {
        resetSessionTimeout();
      } else {
        logout();
      }
    }, 30000);
    setSessionTimeout(timeout);
  };

  const logout = () => {
    // Clear session timeout and remove token from local storage
    clearTimeout(sessionTimeout);
    localStorage.removeItem('token');
    alert('You have been logged out due to inactivity.');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"style={{ backgroundColor: '#F6F1FD' }}>
      {showHomeForm && (
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" /> {/* Insert your logo here */}
            <h1 className="text-3xl font-semibold mb-6">Login</h1>
          </div>
          <form onSubmit={loginUser}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="form-input mt-1 block w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="form-input mt-1 block w-full rounded-md border-gray-300"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-purple-900" style={{ backgroundColor: '#5514B4' }}>Login</button>
              <p className="mt-3 text-gray-600">
                Not an existing user?
                <Link to="/register" className="text-blue-500 underline ml-1">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
