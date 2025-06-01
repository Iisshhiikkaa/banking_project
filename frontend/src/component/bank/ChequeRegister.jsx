import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ChequeRegister = () => {
  const { city, branch, state } = useParams();

  const [formData, setFormData] = useState({
    chequeNumber: "",
    issueDate: "",
    payeeName: "",
    amount: "",
    purpose: "",
    status: "Pending",
  });

  const [cheques, setCheques] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/cheque/chequeregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, city, branch, state }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Cheque added successfully!");
      setCheques((prev) => [...prev, data.cheque]);
      setFormData({
        chequeNumber: "",
        issueDate: "",
        payeeName: "",
        amount: "",
        purpose: "",
        status: "Pending",
      });
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/cheque/${state}/${city}/${branch}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCheques(data);
      } catch (err) {
        setMessage("Error fetching cheques: " + err.message);
      }
    };

    fetchCheques();
  }, [city, branch, state]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Cheque Register</h2>

      {message && (
        <p className="text-center text-green-600 font-medium mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input name="chequeNumber" placeholder="Cheque Number" value={formData.chequeNumber} onChange={handleChange} required className="border p-2 rounded" />
        <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required className="border p-2 rounded" />
        <input name="payeeName" placeholder="Payee Name" value={formData.payeeName} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="border p-2 rounded" />
        <input name="purpose" placeholder="Purpose" value={formData.purpose} onChange={handleChange} className="border p-2 rounded" />
        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
          <option value="Pending">Pending</option>
          <option value="Cleared">Cleared</option>
          <option value="Bounced">Bounced</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Cheque</button>
        </div>
      </form>

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
            </tr>
          </thead>
          <tbody>
            {cheques.length > 0 ? (
              cheques.map((cheque, index) => (
                <tr key={cheque._id}>
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{cheque.chequeNumber}</td>
                  <td className="p-2 border">{cheque.issueDate?.slice(0, 10)}</td>
                  <td className="p-2 border">{cheque.payeeName}</td>
                  <td className="p-2 border text-right">₹{parseFloat(cheque.amount).toFixed(2)}</td>
                  <td className="p-2 border">{cheque.purpose}</td>
                  <td className="p-2 border text-center">{cheque.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 p-4">No cheque entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChequeRegister;
