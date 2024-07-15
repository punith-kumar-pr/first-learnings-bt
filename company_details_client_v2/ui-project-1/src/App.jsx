import { useState } from "react";
import SearchForm from "./components/SearchForm";
import axios from "axios";
import SideNav from "./components/SideNav";
import Home from "./components/Home";
import Register from './components/Register';
import TopBar from './components/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterFormData, setFilterFormData] = useState({});
 
  async function fetchDataWithToken()  {
    try {
      const storedToken = localStorage.getItem("token");
      console.log("Token from local storage:", storedToken);
      const authenticate = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      };
 
      const payload = {
        searchRequestDto: Object.entries(filterFormData).map(([column, value]) => ({
          column,
          value
        }))
      };
      console.log("Headers sent with the request:", authenticate.headers);
      console.log("Payload:", payload);
      const response = await axios.post("http://localhost:8090/api/v1/companies/specification", payload, authenticate);
 
      setData(response.data);
 
      const filtered = response.data.filter((company) => {
        return Object.entries(filterFormData).every(([column, value]) => {
          return !value || String(company[column]) === value;
        });
      });
      setFilteredData(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  const handleFilter = () => {
    fetchDataWithToken();
    setFilterFormData({}); // Reset filter form state after fetching data
  };
 
  return (
    <div>
      {/* Top bar component */}
      <TopBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/searchform"
            element={
              <div className="flex">
                <SideNav />
                <div className="bg-gray-100 max-h-screen w-3/4 overflow-y-auto">
                  <SearchForm
                    filterFormData={filterFormData}
                    setFilterFormData={setFilterFormData}
                    onFilter={handleFilter}
                    filteredData={filteredData}
                  />
                </div>
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};
 
export default App;
