import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/BT logo-1.png'; 
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8090/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data) {
        alert("Registration successful");
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"style={{ backgroundColor: '#F6F1FD' }}>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
      <div className="text-center mb-4">
            <img src={logo} alt="Logo" className="h-16 mx-auto mb-4" /> {/* Insert your logo here */}
        <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
        </div><form onSubmit={registerUser}>
          <div className="mb-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-6">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="py-2 px-4 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-600" style={{ backgroundColor: '#5514B4' }}>Register</button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
