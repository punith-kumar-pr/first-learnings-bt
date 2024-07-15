import{useEffect, React} from "react";

import {  useNavigate} from 'react-router-dom';
const SideNav = ({ activeNavItem, onNavItemClick }) => {
  const navigate = useNavigate();

  useEffect(()=>{
    
    const token = localStorage.getItem("token");
   
    if (!token) {
      navigate("/");
    } 
  });
 
  return (
    <div className="w-64 bg-gray-800 text-white">
      <ul className="p-0 m-0">
        <li
          className={`py-2 px-4 cursor-pointer ${
            activeNavItem === "HOME" ? "bg-gray-900" : ""
          }`}
          onClick={() => onNavItemClick("HOME")}
        >
          <i className="px-1 fas fa-house"></i>
          HOME
        </li>
        <li
          className={`py-2 px-4 cursor-pointer ${
            activeNavItem === "COMPANY" ? "bg-gray-900" : ""
          }`}
          onClick={() => onNavItemClick("COMPANY")}
        >
          <i className="px-1 fas fa-building"></i>
          COMPANY
        </li>
        <li
          className={`py-2 px-4 cursor-pointer ${
            activeNavItem === "ACCOUNTS" ? "bg-gray-900" : ""
          }`}
          onClick={() => onNavItemClick("ACCOUNTS")}
        >
          <i className="px-1 fas fa-file-invoice"></i>
          ACCOUNTS
        </li>
        <li
        
          className={`py-2 px-4 cursor-pointer ${
            activeNavItem === "SIGN_OUT" ? "bg-gray-900" : ""
          }`}
          onClick={() => onNavItemClick("SIGN_OUT")}
        >
          <i className="px-1 fas fa-arrow-right-from-bracket"></i>
          SIGN-OUT
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  );
};

export default SideNav;
