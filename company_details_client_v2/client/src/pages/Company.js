import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import SearchForm from "./SearchForm";
import axios from "axios";

const Dashboard = ({token}) => {
//   const [token, setToken]
  const [filteredData, setFilteredData] = useState({});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterFormData, setFilterFormData] = useState({
    companyID: '',
    companyName: '',
    legalEntityID: '',
    status: '',
    companyCode: ''
  });

  const handleFilter = async () => {
    try {
        const searchRequests = Object.entries(filterFormData)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => ({ column: key, value }));
          
      const requestBody = {
        searchRequestDto: searchRequests
      };
      
      console.log("requestBody", requestBody)
      

      const token = localStorage.getItem('token')
      console.log("token", token)

    // const response = await axios.post(
    //     'http://localhost:8080/api/companies/specification', 
    //     requestBody, 
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json' // Adjust the Content-Type header as needed
    //       }
    //     }
    //   );

    const response = await fetch('http://localhost:8080/api/v1/companies/specification',{
        method: 'POST',
        headers : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(requestBody)
      })
      const filteredData = response;
      
      setFilteredData(filteredData);
      console.log('Filtered data:', filteredData);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  return (
    <>
    <NavBar />
      <div className="container mx-auto flex">
        <SideBar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto p-4">
            <SearchForm filterFormData={filterFormData} setFilterFormData={setFilterFormData} onFilter={handleFilter} />
            {/* <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Filtered Data</h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Company ID</th>
                    <th className="py-2 px-4 border-b">Company Name</th>
                    <th className="py-2 px-4 border-b">Legal Entity ID</th>
                    <th className="py-2 px-4 border-b">Status</th>
                    <th className="py-2 px-4 border-b">Company Code</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(company => (
                    <tr key={company.companyId} onClick={() => handleCompanyClick(company)} className="cursor-pointer hover:bg-gray-200">
                      <td className="py-2 px-4 border-b">{company.companyId}</td>
                      <td className="py-2 px-4 border-b">{company.companyName}</td>
                      <td className="py-2 px-4 border-b">{company.legalEntityId}</td>
                      <td className="py-2 px-4 border-b">{company.status}</td>
                      <td className="py-2 px-4 border-b">{company.companyCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            {/* {selectedCompany && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Company Details</h2>
                <div className="bg-white p-4 rounded shadow-md mb-4">
                  <h3 className="text-lg font-bold mb-2">{selectedCompany.companyName}</h3>
                  <p><strong>Company ID:</strong> {selectedCompany.companyId}</p>
                  <p><strong>Legal Entity ID:</strong> {selectedCompany.legalEntityId}</p>
                  <p><strong>Status:</strong> {selectedCompany.status}</p>
                  <p><strong>Company Code:</strong> {selectedCompany.companyCode}</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
    </div>
    </>
  );
};

export default Dashboard;
