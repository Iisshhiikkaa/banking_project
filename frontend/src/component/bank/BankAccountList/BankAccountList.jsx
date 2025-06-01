import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HOSTURL } from '../../../utils/constant';


const BankAccountList = () => {
  const { city, branch, state } = useParams();
const [people,setpeople]=useState([])

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const res = await fetch(`${HOSTURL}/api/bank/${state}/${city}/${branch}`);
        const datas = await res.json();
        if (!res.ok) throw new Error(datas.message);
        setpeople(datas);
        console.log(datas)
      } catch (err) {
        console.log("Error fetching cheques: " + err.message);
      }
    };
    fetchCheques();
  }, [state,city,branch]);

  const [formData, setFormData] = useState({
    accountID: '',

  });

  const [filteredPeople, setFilteredPeople] = useState(people);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const { accountID } = formData;

    const result = people.filter((person) => {
      return (
        (!accountID || (person.accountID && person.accountID.includes(accountID))) 
      );
    });

    setFilteredPeople(result);
  };

  const columns = [
    "groupName",
    "groupType",
    "registrationNumber",
    "dateOfFormation",
    "groupAddress",
    "purpose",
    "members",
    "authorizedSignatories",
    "groupLeader",
    "meetingFrequency",
    "affiliatedInstitution",
    "savingsPerMember",
    "branch",
    "accountType",
    "initialDeposit",
    "city",
    "state",
    "memberID",
    "otherGroupType",
    "accountID" // add if not already present in your data
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg mx-auto p-4">
         <h2 className="text-2xl font-bold text-blue-700 mb-8 border-b-2 border-gray-200 pb-3">
         Group Account Information      </h2>
      <div className="mb-4 space-y-2">
        <div className="flex gap-4  p-6 shadow-2xl">
       

          <div className="flex flex-col ">
            <label >Group ID</label>
            <input
              type="text"
              name="accountID"
              value={formData.accountID}
              onChange={handleChange}
              className="border px-4 py-2 w-[500px] rounded"
            />
          </div>

          <button
          type="button"
          onClick={handleSearch}
          className="mt-6 px-7 h-10  bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Search
        </button>
    
        </div>

          </div>
<div className=' w-[1300px] overflow-x-scroll'> 
      <table className="min-w-full table-auto border-collapse  bg-white  rounded-lg shadow-md">
        <thead className="bg-blue-700 text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left min-w-[120px]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {filteredPeople.map((person, index) => (
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
                >
                  {person[col] !== null && person[col] !== "" ? person[col] : '--'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default BankAccountList;
