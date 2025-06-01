import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../utils/userSlice";
// import { addCustomer } from "../../utils/customerSlice";
import {emptyUserInfo} from "../../../utils/userSlice"
import { useParams } from "react-router";
import axios from 'axios';
import { HOSTURL } from "../../../utils/constant";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const AdditionalInformationForm = ({ setActiveTab }) => {
  const {city,branch,state}=useParams()

  const [data, setData] = useState({
    nomineeName: "",
    relationship: "",
    contactInfo: "",
    specialNeeds: "",
    notes: "",
    referralSource: "",
     status:"active" ,
    membershipTier: "",
  });

  const dispatch = useDispatch();
  const godata = useSelector((state) => state.user.userInfo);

  // Optional: log store updates
  useEffect(() => {
    // console.log("Accumulated userInfo:", godata);
  }, [godata]);

  const handleChange = (key) => (e) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  // const handleSubmit = () => {
  //   // 1) Save this step's data to user slice
  //   dispatch(adduser(data));

  //   // 2) Merge entire user info with additional info
  //   const fullCustomer = { ...godata, ...data };

  //   // 3) Dispatch to customer slice
  //   dispatch(addCustomer(fullCustomer));

  //   // 4) Trigger JSON file download
    
  //   alert("Customer Registered Successfully!");
  //   // Optionally: reset form, redirect, etc.
  // };

  const handleSubmit = async () => {
    // 1) Save to Redux if you need…
    dispatch(adduser(data));
  const branchd = branch.split("_")||[];
  const sum = branchd.slice(0, 2).map(word => word[0].toUpperCase()).join("");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const currentDate = new Date().toISOString().split("T")[0];
  const memberid=(`${state[0].toUpperCase()}${city[0].toUpperCase()}${sum}`+(currentDate.replaceAll("-",'')+randomNumber));
 
 

 //time
 const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
const time12hr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

// console.log("Current Time:", time12hr);

 
  // 2) Merge full object
    const fullCustomer = { ...godata, ...data  , memberID: memberid,date:currentDate+" "+time12hr};
    // fullCustomer[memberID]="bob"+fullCustomer[aadhaar]
    console.log(fullCustomer);
    



    
   try {
      const res = await fetch(HOSTURL+"/api/newmember/registerNewMember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fullCustomer, city, branch, state }),
      });

      const data = await res.json();
if (!res.ok) {
  alert(`Erro: ${data.message || "Failed to add member"}`);
  return;
  
}

} catch (err) {
  console.log("gggggggggggg",err)
    }

    // Read from localStorage safely
    
  alert("new member successfully Added")
  dispatch(emptyUserInfo())
  setActiveTab("Personal Information")
  
     // inside handleSubmit

      
  };
  

  
  // useEffect(() => {
  //     const fetchCheques = async () => {
  //       try {
  //         const res = await fetch(`http://localhost:8000/api/newmember/${state}/${city}/${branch}`);
  //         const data = await res.json();
  //         if (!res.ok) throw new Error(data.message);
  //         // setdata(data);
  //         console.log(data)
  //       } catch (err) {
  //         console.log("Error fetching cheques: " + err.message);
  //       }
  //     };
  
  //     fetchCheques();
  //   }, [city, branch, state]);
  

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Additional Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Nominee Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nominee Name</label>
          <input
            type="text"
            placeholder="Enter Nominee Name"
            className={inputClass}
            value={data.nomineeName}
            onChange={handleChange("nomineeName")}
          />
        </div>

        {/* Relationship */}
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

        {/* Contact Information */}
        <div className="mb-4 col-span-2">
          <label className="block font-medium mb-1">Contact Information</label>
          <input
            type="text"
            placeholder="Enter Contact Info"
            className={inputClass}
            value={data.contactInfo}
            onChange={handleChange("contactInfo")}
          />
        </div>

        {/* Special Needs */}
        <div className="mb-4 col-span-2">
          <label className="block font-medium mb-1">Special Needs</label>
          <textarea
            placeholder="Mention any special needs"
            rows={2}
            className={inputClass}
            value={data.specialNeeds}
            onChange={handleChange("specialNeeds")}
          />
        </div>

        {/* Notes/Remarks */}
        <div className="mb-4 col-span-2">
          <label className="block font-medium mb-1">Custom Notes / Remarks</label>
          <textarea
            placeholder="Add any notes or remarks"
            rows={2}
            className={inputClass}
            value={data.notes}
            onChange={handleChange("notes")}
          />
        </div>

        {/* Referral Source */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Referral Source</label>
          <input
            type="text"
            placeholder="Referral Source"
            className={inputClass}
            value={data.referralSource}
            onChange={handleChange("referralSource")}
          />
        </div>

        {/* Membership Tier */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Membership Tier</label>
          <select
            className={inputClass}
            value={data.membershipTier}
            onChange={handleChange("membershipTier")}
          >
            <option value="">Select Tier</option>
            <option value="basic">Basic</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => setActiveTab("Group Information")}
        >
          Back
        </button>

        <button
          className="bg-blue-600 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdditionalInformationForm;






// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { adduser } from "../../utils/userSlice";
// import { addnewCustmer } from "../../utils/customerSlice";

// const inputClass =
//   "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

// const AdditionalInformationForm = ({ setActiveTab }) => {
//   const [data, setData] = useState({
//     nomineeName: "",
//     relationship: "",
//     contactInfo: "",
//     specialNeeds: "",
//     notes: "",
//     referralSource: "",
//     membershipTier: "",
//   });

//   const dispatch = useDispatch();
//   const godata = useSelector((store) => store.user);

//   const handleChange = (key) => (e) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: e.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Save current step's form data to userSlice (optional if already added in earlier steps)
//     dispatch(adduser(data));

//     // Merge full user data and dispatch to customerSlice
//     const finalData = { ...godata, ...data };
//     dispatch(addnewCustmer(finalData));

//     alert("Customer Registered Successfully!");
//     // Optionally: reset form or navigate away
//   };

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
//       <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
//         Additional Information
//       </h2>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Nominee Name</label>
//           <input
//             type="text"
//             placeholder="Enter Nominee Name"
//             className={inputClass}
//             value={data.nomineeName}
//             onChange={handleChange("nomineeName")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Relationship</label>
//           <input
//             type="text"
//             placeholder="Enter Relationship"
//             className={inputClass}
//             value={data.relationship}
//             onChange={handleChange("relationship")}
//           />
//         </div>

//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Contact Information</label>
//           <input
//             type="text"
//             placeholder="Enter Contact Info"
//             className={inputClass}
//             value={data.contactInfo}
//             onChange={handleChange("contactInfo")}
//           />
//         </div>

//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Special Needs</label>
//           <textarea
//             placeholder="Mention any special needs"
//             rows={2}
//             className={inputClass}
//             value={data.specialNeeds}
//             onChange={handleChange("specialNeeds")}
//           />
//         </div>

//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Custom Notes / Remarks</label>
//           <textarea
//             placeholder="Add any notes or remarks"
//             rows={2}
//             className={inputClass}
//             value={data.notes}
//             onChange={handleChange("notes")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Referral Source</label>
//           <input
//             type="text"
//             placeholder="Referral Source"
//             className={inputClass}
//             value={data.referralSource}
//             onChange={handleChange("referralSource")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Membership Tier</label>
//           <select
//             className={inputClass}
//             value={data.membershipTier}
//             onChange={handleChange("membershipTier")}
//           >
//             <option value="">Select Tier</option>
//             <option value="basic">Basic</option>
//             <option value="silver">Silver</option>
//             <option value="gold">Gold</option>
//             <option value="platinum">Platinum</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button
//           className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
//           onClick={() => setActiveTab("Group Information")}
//         >
//           Back
//         </button>

//         <button
//           className="bg-blue-600 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdditionalInformationForm;












// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { adduser } from "../../utils/userSlice";
// import { addCustomer } from "../../utils/customerSlice";

// const inputClass =
//   "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

// const AdditionalInformationForm = ({ setActiveTab }) => {
//   const [data, setData] = useState({
//     nomineeName: "",
//     relationship: "",
//     contactInfo: "",
//     specialNeeds: "",
//     notes: "",
//     referralSource: "",
//     membershipTier: "",
//   });

//   const dispatch = useDispatch();
//   const godata = useSelector((state) => state.user.userInfo);

//   // Optional: log store updates
//   useEffect(() => {
//     console.log("Accumulated userInfo:", godata);
//   }, [godata]);

//   const handleChange = (key) => (e) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: e.target.value,
//     }));
//   };

//   // const handleSubmit = () => {
//   //   // 1) Save this step's data to user slice
//   //   dispatch(adduser(data));

//   //   // 2) Merge entire user info with additional info
//   //   const fullCustomer = { ...godata, ...data };

//   //   // 3) Dispatch to customer slice
//   //   dispatch(addCustomer(fullCustomer));

//   //   // 4) Trigger JSON file download
    
//   //   alert("Customer Registered Successfully!");
//   //   // Optionally: reset form, redirect, etc.
//   // };

//   const handleSubmit = async () => {
//     // 1) Save to Redux if you need…
//     dispatch(adduser(data));
  
//     // 2) Merge full object
//     const fullCustomer = { ...godata, ...data };
  
//     try {
//       const resp = await fetch("/api/users", {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify(fullCustomer),
//       });
//       const json = await resp.json();
//       if (!resp.ok) throw new Error(json.error || "Unknown error");
  
//       alert(`Saved! You now have ${json.total} users.`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save user. See console for details.");
//     }
//   };
  

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
//       <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
//         Additional Information
//       </h2>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Nominee Name */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Nominee Name</label>
//           <input
//             type="text"
//             placeholder="Enter Nominee Name"
//             className={inputClass}
//             value={data.nomineeName}
//             onChange={handleChange("nomineeName")}
//           />
//         </div>

//         {/* Relationship */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Relationship</label>
//           <input
//             type="text"
//             placeholder="Enter Relationship"
//             className={inputClass}
//             value={data.relationship}
//             onChange={handleChange("relationship")}
//           />
//         </div>

//         {/* Contact Information */}
//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Contact Information</label>
//           <input
//             type="text"
//             placeholder="Enter Contact Info"
//             className={inputClass}
//             value={data.contactInfo}
//             onChange={handleChange("contactInfo")}
//           />
//         </div>

//         {/* Special Needs */}
//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Special Needs</label>
//           <textarea
//             placeholder="Mention any special needs"
//             rows={2}
//             className={inputClass}
//             value={data.specialNeeds}
//             onChange={handleChange("specialNeeds")}
//           />
//         </div>

//         {/* Notes/Remarks */}
//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Custom Notes / Remarks</label>
//           <textarea
//             placeholder="Add any notes or remarks"
//             rows={2}
//             className={inputClass}
//             value={data.notes}
//             onChange={handleChange("notes")}
//           />
//         </div>

//         {/* Referral Source */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Referral Source</label>
//           <input
//             type="text"
//             placeholder="Referral Source"
//             className={inputClass}
//             value={data.referralSource}
//             onChange={handleChange("referralSource")}
//           />
//         </div>

//         {/* Membership Tier */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Membership Tier</label>
//           <select
//             className={inputClass}
//             value={data.membershipTier}
//             onChange={handleChange("membershipTier")}
//           >
//             <option value="">Select Tier</option>
//             <option value="basic">Basic</option>
//             <option value="silver">Silver</option>
//             <option value="gold">Gold</option>
//             <option value="platinum">Platinum</option>
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button
//           className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
//           onClick={() => setActiveTab("Group Information")}
//         >
//           Back
//         </button>

//         <button
//           className="bg-blue-600 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdditionalInformationForm;

