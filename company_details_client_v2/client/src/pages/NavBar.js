
import React , {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt'

const NavBar = () => {
    const navigate = useNavigate()
    const [username,setUserName] = useState("")

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = decodeToken(token);
            setUserName(user.sub)
            if(!user){
                navigate("/login")
                localStorage.removeItem(token)
              }
        } else {
            navigate("/login")
            localStorage.removeItem(token)
      }  
    },[navigate])

    function logout () {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <nav className="bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">Company Details</Link>
        <div>
          <Link to="/profile" className="mx-4">Profile</Link>
          
          <button onClick={logout} className="mx-4">{username} Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
