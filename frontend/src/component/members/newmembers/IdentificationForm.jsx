import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../utils/userSlice";
// import { addnewCustmer } from "../../utils/customerSlice";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const IdentificationForm = ({ setActiveTab }) => {
  const [data, setData] = useState({
    aadhaar: "",
    passport: "",
    drivingLicense: "",
    pan: "",
    aadhaarFile: null,
    drivingLicenseFile: null,
  });

  
  const dispatch = useDispatch();
  const godata = useSelector((store) => store.user);

  const handleChange = (key) => (e) => {
    const value = key.includes("File") ? e.target.files[0] : e.target.value;
    setData((prev) => ({
      ...prev,
      
      [key]: value,
    }));
  };

  const handleNext = () => {
    // dispatch(addnewCustmer(godata)); // Check naming
    dispatch(adduser(data));
    setActiveTab("Financial Information");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Government ID Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Aadhaar Number</label>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            className={inputClass}
            value={data.aadhaar}
            onChange={handleChange("aadhaar")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Passport Number</label>
          <input
            type="text"
            placeholder="Enter Passport Number"
            className={inputClass}
            value={data.passport}
            onChange={handleChange("passport")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Driving License Number</label>
          <input
            type="text"
            placeholder="Enter Driving License Number"
            className={inputClass}
            value={data.drivingLicense}
            onChange={handleChange("drivingLicense")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">PAN Card</label>
          <input
            type="text"
            placeholder="Enter PAN Card Number"
            className={inputClass}
            value={data.pan}
            onChange={handleChange("pan")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Aadhaar</label>
          <input
            type="file"
            className="w-full border border-gray-300 p-1 rounded"
            onChange={handleChange("aadhaarFile")}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Driving License</label>
          <input
            type="file"
            className="w-full border border-gray-300 p-1 rounded"
            onChange={handleChange("drivingLicenseFile")}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => setActiveTab("Personal Information")}
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

export default IdentificationForm;
