import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import NavBar from './NavBar'
import SideBar from './SideBar'

const Dashboard = () => {
  const navigate = useNavigate()

  const [hello, setHello] = useState('')

  async function populateQuote() {
    const token = localStorage.getItem('token');
    const req = await fetch('http://localhost:8080/api/v1/companies',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await req.text()
    setHello(data)
    console.log(data)
    // if(data.status === 'ok')
    // {
    //   console.log()
    // } else {
    //   alert(data.error);
    // }
  } 

  useEffect(()=>{
    const token = localStorage.getItem('token')
    console.log("token", token)
    if(token){
      const user = decodeToken(token);
      console.log("user", user.sub)
      if(!user){
        navigate("/login")
        localStorage.removeItem(token)
      } 
      else {
        populateQuote();
      }
    } else {
      navigate('/login');
    }
  })
  
  return (
    <>
      <NavBar />
      <div className="container mx-auto flex">
        <SideBar />
        <main className="flex-grow p-4 overflow-y-auto">
          <div className="h-full">
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p>{hello} -- this is a get from backend</p>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
