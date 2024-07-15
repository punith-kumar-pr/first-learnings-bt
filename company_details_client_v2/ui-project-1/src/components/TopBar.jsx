import React from "react";
import logo from "../assets/BT logo-w.png"; // Import your image from the assets folder

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white py-3 px-3 flex items-center"style={{ backgroundColor: '#5514B4' }}>
      {/* Add your image */}
      <img src={logo} alt="Logo" className="h-8 mr-2" /> {/* Adjust the size and margin as needed */}
      {/* Add your top bar content here */}
     
    </div>
  );
};

export default TopBar;
