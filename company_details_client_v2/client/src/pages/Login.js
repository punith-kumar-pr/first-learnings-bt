import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function App() {
  const [email, setEmail,] = useState("")
  const [password, setPassword,] = useState("")

  const navigate = useNavigate()
  
  async function loginUser(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:8080/api/v1/auth/authenticate',{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        email, password,  
      }),
    })

    const data = await response.json()
    // const data = await response.data

    console.log(data)

    if(data.token){
      localStorage.setItem('token', data.token)
      alert("Login successful")
      navigate("/home")
    }
    else{
      alert("Check the email and password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt text-center text-3xl font-bold font-sans text-gray-900">Company Details</h1>
          <h4 className="mt-9 text-center text font-sans font-bold text-gray-900">Login</h4>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <input 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <input 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        
          <div className="text-center my-6 flex flex-col">
            <Link to="/register">
              <p className="text-sm font-sans text-gray-400 hover:text-violet-500">
                Not a User? Create New Account  
              </p>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default App;
