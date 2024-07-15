// SideBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li><Link to="/home" className="hover:bg-gray-700 block py-2 px-4">Home</Link></li>
          <li><Link to="/contact" className="hover:bg-gray-700 block py-2 px-4">Contact</Link></li>
          <li><Link to="/account" className="hover:bg-gray-700 block py-2 px-4">Account</Link></li>
          <li><Link to="/meeting" className="hover:bg-gray-700 block py-2 px-4">Meeting</Link></li>
          <li><Link to="/company" className="hover:bg-gray-700 block py-2 px-4">Company</Link></li>
          <li><Link to="/site" className="hover:bg-gray-700 block py-2 px-4">Site</Link></li>
          <li><Link to="/device" className="hover:bg-gray-700 block py-2 px-4">Device</Link></li>
          <li><Link to="/entitilement" className="hover:bg-gray-700 block py-2 px-4">Entitilement</Link></li>
          <li><Link to="/people" className="hover:bg-gray-700 block py-2 px-4">People</Link></li>
          <li><Link to="/reports" className="hover:bg-gray-700 block py-2 px-4">Reports</Link></li>
          <li><Link to="/system" className="hover:bg-gray-700 block py-2 px-4">System</Link></li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
