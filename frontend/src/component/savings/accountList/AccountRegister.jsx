import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { HOSTURL } from '../../../utils/constant';

const AccountRegister = () => {
  const { city, state, branch } = useParams();
  const [list, setList] = useState([]);

    useEffect(() => {
      const fetchAccounts = async () => {
        try {
          const res = await fetch(`${HOSTURL}/api/savingaccount/${state}/${city}/${branch}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          setList(data);
          
        } catch (err) {
          console.error("Error fetching group accounts: ", err.message);
        }
      };
  
      fetchAccounts();
    }, [state, city, branch]);
  const columns = [
    "AccountNumber", "fullName", "dob", "gender", "maritalStatus", "fatherName", "nationality", "occupation",
    "mobile", "email", "permanentAddress", "currentAddress", "idProofType", "idProofNumber", "panNumber",
    "accountType", "initialDeposit", "nomineeName", "nomineeRelation", "modeOfOperation",
    "debitCard", "netBanking", "smsAlerts", "status", "State", "City", "Branch",
  ];

  return (
    <div className="w-full max-w-[1300px] mx-auto p-6">
      <div className="bg-white p-8 shadow-2xl rounded-2xl border border-gray-300">
        <div className="flex justify-between items-center py-4 mb-4">
          <h2 className="text-3xl font-bold text-gray-800">All Account Holders - {branch} Branch</h2>
        </div>

        {list.length === 0 ? (
          <p className="text-center text-gray-600">No accounts found in this branch.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-2xl mt-4">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-800 text-white">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="px-6 py-3 text-left text-sm font-semibold tracking-wide cursor-pointer hover:bg-blue-700 transition-all">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {list.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-100 transition-all`}>
                    {columns.map((col) => (
                      <td key={col} className="px-6 py-4 text-sm border-b border-gray-200 break-words max-w-[250px]">
                        {String(item[col] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountRegister;
