import React, { useState } from 'react';

const SearchForm = ({ filterFormData, setFilterFormData, onFilter, filteredData }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value
    });
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleClearFilter = () => {
    setFilterFormData({
      companyId: '',
      companyName: '',
      legalEntityID: '',
      status: '',
      companyCode: ''
    });
    setSelectedCompany(null);
    setSearchClicked(false); // Reset search button clicked state
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
    onFilter();
  };

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: '#F6F1FD' }}>
      <div className="bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold py-4 px-6 border-b text-purple-800">Search Form</h1>
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <label htmlFor="Company_ID" className="block text-sm font-medium text-gray-600">Company ID</label>
                <input type="text" id="Company_ID" name="companyId" value={filterFormData.companyId} onChange={handleChange} className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-purple-500" placeholder="Enter Company ID" />
              </div>

              <div>
                <label htmlFor="Company_Name" className="block text-sm font-medium text-gray-600">Company Name</label>
                <input type="text" id="Company_Name" name="companyName" value={filterFormData.companyName} onChange={handleChange} className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-purple-500" placeholder="Enter Company Name" />
              </div>

              <div>
                <label htmlFor="Legal_Entity_ID" className="block text-sm font-medium text-gray-600">Legal Entity ID</label>
                <input type="text" id="Legal_Entity_ID" name="legalEntityID" value={filterFormData.legalEntityID} onChange={handleChange} className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-purple-500" placeholder="Enter Legal Entity ID" />
              </div>

              <div>
                <label htmlFor="Status" className="block text-sm font-medium text-gray-600">Status</label>
                <select id="Status" name="status" value={filterFormData.status} onChange={handleChange} className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-purple-500">
                  <option value=""></option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="Company_Code" className="block text-sm font-medium text-gray-600">Company Code</label>
                <input type="text" id="Company_Code" name="companyCode" value={filterFormData.companyCode} onChange={handleChange} className="mt-1 p-2 border rounded w-full focus:outline-none focus:border-purple-500" placeholder="Enter Company Code" />
              </div>
            </div>
            <div className="flex justify mt-6">
              <button onClick={handleSearchClick} className="w-32 mr-2 text-white p-4 rounded hover:bg-purple-600 focus:outline-none" style={{ backgroundColor: '#5514B4' }}>Search</button>
              <button onClick={handleClearFilter} className="w-32 bg-gray-300 text-gray-800 p-4 rounded hover:bg-gray-400 focus:outline-none">Clear</button>
            </div>
          </div>
        </div>
      </div>

      {searchClicked && filteredData.length > 0 && (
        <div className="container mx-auto mt-6">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold py-4 px-6 border-b text-purple-800">Filtered Data</h2>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr style={{ backgroundColor: '#5514B4' }}>
                      <th className="py-2 px-4 border-b text-white">Company ID</th>
                      <th className="py-2 px-4 border-b text-white">Company Name</th>
                      <th className="py-2 px-4 border-b text-white">Legal Entity ID</th>
                      <th className="py-2 px-4 border-b text-white">Status</th>
                      <th className="py-2 px-4 border-b text-white">Company Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((company) => (
                      <tr
                        key={company.companyId}
                        onClick={() => handleCompanyClick(company)}
                        className="cursor-pointer hover:bg-gray-200"
                      >
                        <td className="py-2 px-8 border-b">{company.companyId}</td>
                        <td className="py-2 px-8 border-b">{company.companyName}</td>
                        <td className="py-2 px-8 border-b">{company.legalEntityId}</td>
                        <td className="py-2 px-8 border-b">{company.status}</td>
                        <td className="py-2 px-8 border-b">{company.companyCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCompany && (
        <div className="container mx-auto mt-6">
          <div className="bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold py-4 px-6 border-b text-purple-800">Company Details</h2>
            <div className="p-6">
              <div className="bg-white rounded shadow-md mb-4">
                <div className="p-6 md:flex md:flex-wrap">
                  <div className="md:w-1/2 md:pr-4">
                    <h3 className="text-lg font-bold mb-2">{selectedCompany.companyName}</h3>
                    <p><strong>Company ID:</strong> {selectedCompany.companyId}</p>
                    <p><strong>Legal Entity ID:</strong> {selectedCompany.legalEntityId}</p>
                    <p><strong>Status:</strong> {selectedCompany.status}</p>
                    <p><strong>Company Code:</strong> {selectedCompany.companyCode}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded shadow-md mb-4">
                <h3 className="text-lg font-bold mb-2 text-purple-800">Sites</h3>
                <div className="overflow-x-auto p-6">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr style={{ backgroundColor: '#5514B4' }}>
                        <th className="py-2 px-4 border-b text-white">Site ID</th>
                        <th className="py-2 px-4 border-b text-white">Site Name</th>
                        <th className="py-2 px-4 border-b text-white">Type</th>
                        <th className="py-2 px-4 border-b text-white">Certified</th>
                        <th className="py-2 px-4 border-b text-white">Certified Date</th>
                        <th className="py-2 px-4 border-b text-white">Watch</th>
                        <th className="py-2 px-4 border-b text-white">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCompany.sites.map((site) => (
                        <tr key={site.siteId}>
                          <td className="py-2 px-4 border-b">{site.siteId}</td>
                          <td className="py-2 px-4 border-b">{site.siteName}</td>
                          <td className="py-2 px-4 border-b">{site.type}</td>
                          <td className="py-2 px-4 border-b">{site.certified}</td>
                          <td className="py-2 px-4 border-b">{site.certifiedDate}</td>
                          <td className="py-2 px-4 border-b">{site.watch}</td>
                          <td className="py-2 px-4 border-b">{site.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded shadow-md">
                <h3 className="text-lg font-bold mb-2 text-purple-800">Notes</h3>
                <p className="p-6">{selectedCompany.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
