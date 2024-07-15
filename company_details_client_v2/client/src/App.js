import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Company from "./pages/Company"
import Redirect from "./pages/Redirect"

const App = () => {
    return (
        // <div className="h-screen flex flex-col">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Redirect/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/company" element={<Company />} />
                </Routes>
            </BrowserRouter>
        // </div>
    )
}

export default App;