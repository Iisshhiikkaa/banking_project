import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { HOSTURL } from '../../../utils/constant';

export const CustomersTable = () => {
  const {city,branch,state}=useParams()

  // const people = JSON.parse(localStorage.getItem(branch)) || [];
const [people,setpeople]=useState([])
   useEffect(() => {
      const fetchCheques = async () => {
        try {
          const res = await fetch(`${HOSTURL}/api/newmember/${state}/${city}/${branch}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setpeople(data);
          console.log(data)
        } catch (err) {
          console.log("Error fetching cheques: " + err.message);
        }
      };
  
      fetchCheques();
    }, [city, branch, state]);
 



  const columns = [
   "memberID","status","member_state","firstName","date", "aadhaar", "aadhaarFile", "address", "city", "contactInfo", "contactName",
    "dob", "drivingLicense", "drivingLicenseFile", "email", "employer",
     "groupFee", "groupId", "groupName", "income", "incomeSource",
    "lastName", "membershipTier", "middleName", "nomineeName", "notes", 
    "occupation", "pan", "passport", "phone", "phoneNumber", "postalCode", 
    "referencePerson","email_another","phone_another","member_city", "referralSource", "relationship", "specialNeeds", "state", "taxId",
  ];
   
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const sortedPeople = [...people].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };



  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
        <thead className="bg-blue-950 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left cursor-pointer min-w-[120px] hover:bg-slate-600"
                onClick={() => requestSort(col)}
              >
                {col}
                {sortConfig.key === col ? (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽') : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedPeople.map((person, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              } hover:bg-gray-100 transition-all ease-in-out`}
            >
             
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-3 py-1 text-left border-b border-r-2 break-words"
                  style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
                >
                  {/* Display '--' if the data is null or empty */}
                  {person[col] !== null && person[col] !== "" ? person[col] : '--'}
                  
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MemberList = () => {
  const navigate = useNavigate();
  const {state,city,branch}=useParams()

  const handleNewMember = () => {
    navigate(`/boi/${state}/${city}/${branch}/dashboard/newmember`);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <div className="bg-white p-6 shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Member List</h2> 
        <button
          type="button"
          className="px-3 py-2 bg-slate-400 my-2 hover:bg-slate-300 rounded"
          onClick={handleNewMember}
        >
          Add New Member
        </button>
        <CustomersTable />
      </div>
    </div>
  );
};

export default MemberList;
