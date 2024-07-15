import React from 'react';

const SearchForm = ({ filterFormData, setFilterFormData, onFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value
    });
  };

  console.log(filterFormData)
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h1 className="text-2xl font-bold mb-4">Search Form</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="Company_ID" className="block text-sm font-medium text-gray-600">Company ID</label>
          <input type="text" id="Company_ID" name="companyID" value={filterFormData.companyID} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
        </div>

        <div>
          <label htmlFor="Company_Name" className="block text-sm font-medium text-gray-600">Company Name</label>
          <input type="text" id="Company_Name" name="companyName" value={filterFormData.companyName} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
        </div>

        <div>
          <label htmlFor="Legal_Entity_ID" className="block text-sm font-medium text-gray-600">Legal Entity ID</label>
          <input type="text" id="Legal_Entity_ID" name="legalEntityID" value={filterFormData.legalEntityID} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
        </div>

        <div>
          <label htmlFor="Status" className="block text-sm font-medium text-gray-600">Status</label>
          <select id="Status" name="status" value={filterFormData.status} onChange={handleChange} className="mt-1 p-2 border rounded w-full">
            <option value=""></option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label htmlFor="Company_Code" className="block text-sm font-medium text-gray-600">Company Code</label>
          <input type="text" id="Company_Code" name="companyCode" value={filterFormData.companyCode} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
        </div>
      </div>

      <button onClick={onFilter} className="mt-4 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 w-full md:w-auto">Filter</button>
    </div>
  );
};

export default SearchForm;