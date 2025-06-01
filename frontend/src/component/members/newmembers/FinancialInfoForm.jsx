import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../utils/userSlice";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const FinancialInfoForm = ({ setActiveTab }) => {
  const [data, setData] = useState({
   
    occupation: "",
    employer: "",
    income: "",
    incomeSource: "",
    taxId: "",
  });

  const dispatch = useDispatch();
  const godata = useSelector((store) => store.user);

  const handleChange = (key) => (e) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleNext = () => {
    // dispatch(adduser({ ...godata, ...data }));
    dispatch(adduser(data));
    setActiveTab("Emergency Contacts");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Financial Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Occupation / Job Title</label>
          <input
            type="text"
            placeholder="Enter Occupation or Job Title"
            className={inputClass}
            value={data.occupation}
            onChange={handleChange("occupation")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Employer Name</label>
          <input
            type="text"
            placeholder="Enter Employer Name"
            className={inputClass}
            value={data.employer}
            onChange={handleChange("employer")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Annual Income</label>
          <input
            type="text"
            placeholder="Enter Annual Income"
            className={inputClass}
            value={data.income}
            onChange={handleChange("income")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Source of Income</label>
          <select
            className={inputClass}
            value={data.incomeSource}
            onChange={handleChange("incomeSource")}
          >
            <option value="">Select Source of Income</option>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Freelance">Freelance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4 col-span-2">
          <label className="block font-medium mb-1">Tax Identification Number</label>
          <input
            type="text"
            placeholder="Enter Tax Identification Number"
            className={inputClass}
            value={data.taxId}
            onChange={handleChange("taxId")}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => setActiveTab("Identification")}
        >
          Back
        </button>

        <button
          className="bg-blue-600 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FinancialInfoForm;
