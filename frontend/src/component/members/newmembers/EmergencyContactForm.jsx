import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../utils/userSlice";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const EmergencyContactForm = ({ setActiveTab }) => {
  const [data, setData] = useState({
    contactName: "",
    relationship: "",
    phone_another: "",
    email_another: "",
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
    setActiveTab("Group Information");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto ">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Emergency Contact
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Contact Name</label>
          <input
            type="text"
            placeholder="Enter Contact Name"
            className={inputClass}
            value={data.contactName}
            onChange={handleChange("contactName")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Relationship</label>
          <input
            type="text"
            placeholder="Enter Relationship"
            className={inputClass}
            value={data.relationship}
            onChange={handleChange("relationship")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            className={inputClass}
            value={data.phone_another}
            onChange={handleChange("phone_another")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className={inputClass}
            value={data.email_another}
            onChange={handleChange("email_another")}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => setActiveTab("Financial Information")}
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

export default EmergencyContactForm;
