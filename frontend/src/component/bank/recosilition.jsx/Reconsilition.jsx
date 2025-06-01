import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { HOSTURL } from '../../../utils/constant';
import axios from 'axios';

const Reconsilition = () => {
  const { branch, state, city } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState([]);
  const [stateValue, setStateValue] = useState('');
  const [CheckData, setCheckData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const res = await fetch(`${HOSTURL}/api/cheque/${state}/${city}/${branch}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCheckData(data);
      } catch (err) {
        setMessage("Error fetching cheques: " + err.message);
      }
    };

    fetchCheques();
  }, [city, branch, state]);

  const handleSearch = () => {
    const filtered = CheckData.filter((li) => li.chequeNumber === searchValue.trim());
    if (filtered.length > 0) {
      setList(filtered);
      setStateValue(filtered[0].status);
      alert('Cheque Found!');
    } else {
      setList([]);
      alert('Cheque Not Found!');
    }
  };

  const updateInfo = async () => {
    try {
      const chequeNumber = searchValue.trim();
      if (!chequeNumber) {
        alert('Cheque number is required!');
        return;
      }

      const payload = { status: stateValue };

      await axios.put(
        `${HOSTURL}/api/cheque/${state}/${city}/${branch}/${chequeNumber}`,
        payload
      );

      alert('Cheque status updated successfully!');

      // Update local state
      const updated = CheckData.map((item) =>
        item.chequeNumber === chequeNumber ? { ...item, status: stateValue } : item
      );
      setCheckData(updated);
      setList(updated.filter((item) => item.chequeNumber === chequeNumber));
    } catch (error) {
      console.error('Error updating cheque info:', error);
      alert('Failed to update cheque status.');
    }
  };

  // Check if at least one cheque in list is "Pending"
  const hasPendingCheque = list.some((cheque) => cheque.status === 'Pending');

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b pb-2">
        Cheque Reconciliation
      </h2>

      <div className="flex flex-wrap gap-6 items-end mb-6 bg-gray-50 p-4 rounded shadow-inner">
        <div className="flex flex-col w-full sm:w-auto">
          <label className="mb-1 font-medium">Cheque No.</label>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter cheque number"
            className="border border-gray-300 px-4 py-2 rounded w-[300px] sm:w-[500px]"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="h-10 mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded shadow"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Cheque Number</th>
              <th className="p-2 border">Issue Date</th>
              <th className="p-2 border">Payee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Purpose</th>
              <th className="p-2 border">Status</th>
              {hasPendingCheque && <th className="p-2 border">Action</th>}
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((cheque, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{cheque.chequeNumber}</td>
                  <td className="p-2 border">{cheque.issueDate}</td>
                  <td className="p-2 border">{cheque.payeeName}</td>
                  <td className="p-2 border text-right">
                    ₹{parseFloat(cheque.amount).toFixed(2)}
                  </td>
                  <td className="p-2 border">{cheque.purpose}</td>
                  <td className="p-2 border text-center">
                    {cheque.status === 'Pending' ? (
                      <select
                        name="status"
                        value={stateValue}
                        onChange={(e) => setStateValue(e.target.value)}
                        className="px-2 py-1 rounded border"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Cleared">Cleared</option>
                        <option value="Bounced">Bounced</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span>{cheque.status}</span>
                    )}
                  </td>
                  {cheque.status === 'Pending' && (
                    <td className="p-2 border text-center">
                      <button
                        onClick={updateInfo}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                      >
                        Save
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={hasPendingCheque ? 8 : 7}>
                  No cheque entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reconsilition;
