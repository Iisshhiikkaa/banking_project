import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { adduser } from "../../../utils/userSlice";


const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const PersonalInfoForm = ({ setActiveTab }) => {
  const [data, setData] = useState({});
const dispatch=useDispatch()
  const handleChange = (key) => (e) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleNext = () => {
      
      dispatch(adduser(data))
    
    // console.log("Collected Data:", data); // You can dispatch this to Redux or send to backend
    setActiveTab("Identification");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-8 border-b-2 border-gray-200 pb-3">
        Personal Information
      </h2>
      

      <div className="grid grid-cols-2 gap-10">
        {/* Left - Personal Info */}
        <div>
          <div className="mb-5">
            <label className="block font-medium mb-1">Full Name</label>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="First Name" onChange={handleChange("firstName")} className={inputClass} />
              <input type="text" placeholder="Middle Name" onChange={handleChange("middleName")} className={inputClass} />
              <input type="text" placeholder="Last Name" onChange={handleChange("lastName")} className={inputClass} />
            </div>
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Date of Birth</label>
            <input type="date" onChange={handleChange("dob")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Gender</label>
            <select onChange={handleChange("gender")} className={inputClass}>
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Marital Status</label>
            <select onChange={handleChange("maritalStatus")} className={inputClass}>
              <option>Select Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Nationality</label>
            <input type="text" placeholder="Nationality" onChange={handleChange("nationality")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Profile Picture</label>
            <input type="file" onChange={(e) => handleChange("profilePicture")(e)} className="block w-full text-sm" />
          </div>
        </div>

        {/* Right - Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

          <div className="mb-5">
            <label className="block font-medium mb-1">Email Address</label>
            <input type="email" placeholder="Email Address" onChange={handleChange("email")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Phone Number</label>
            <input type="text" placeholder="Phone Number" onChange={handleChange("phone")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Address</label>
            <input type="text" placeholder="Enter Address" onChange={handleChange("address")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">City</label>
            <input type="text" placeholder="Enter City" onChange={handleChange("member_city")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">State</label>
            <input type="text" placeholder="Enter State" onChange={handleChange("member_state")} className={inputClass} />
          </div>

          <div className="mb-5">
            <label className="block font-medium mb-1">Postal Code</label>
            <input type="text" placeholder="Enter Postal Code" onChange={handleChange("postalCode")} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="text-right mt-8">
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

export default PersonalInfoForm;
