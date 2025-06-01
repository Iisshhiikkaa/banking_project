import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../utils/userSlice";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const GroupInformationForm = ({ setActiveTab }) => {
  const [data, setData] = useState({
    groupId: "",
    groupFee: "",
    groupName: "",
    groupAddress: "",
    referencePerson: "",
  });

  const dispatch = useDispatch();


  const handleChange = (key) => (e) => {
    setData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleNext = () => {
    // dispatch(adduser({ ...godata, ...data }));
    dispatch(adduser(data));
    setActiveTab("Additional Information");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Group Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Group ID</label>
          <input
            type="text"
            placeholder="Enter Group ID"
            className={inputClass}
            value={data.groupId}
            onChange={handleChange("groupId")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Group Membership Fee</label>
          <input
            type="text"
            placeholder="Enter Membership Fee"
            className={inputClass}
            value={data.groupFee}
            onChange={handleChange("groupFee")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Group Name</label>
          <input
            type="text"
            placeholder="Enter Group Name"
            className={inputClass}
            value={data.groupName}
            onChange={handleChange("groupName")}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Group Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            className={inputClass}
            value={data.address}
            onChange={handleChange("address")}
          />
        </div>

        <div className="mb-4 col-span-2">
          <label className="block font-medium mb-1">Reference Person</label>
          <input
            type="text"
            placeholder="Enter Reference Person's Name"
            className={inputClass}
            value={data.referencePerson}
            onChange={handleChange("referencePerson")}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
          onClick={() => setActiveTab("Emergency Contacts")}
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

export default GroupInformationForm;



// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { adduser } from "../../utils/userSlice";
// import { addnewCustmer } from "../../utils/customerSlice";

// const inputClass =
//   "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

// const GroupInformationForm = ({ setActiveTab }) => {
//   const [data, setData] = useState({
//     groupId: "",
//     groupFee: "",
//     groupName: "",
//     address: "",
//     referencePerson: "",
//   });

//   const dispatch = useDispatch();
//   const godata = useSelector((store) => store.user);

//   const handleChange = (key) => (e) => {
//     setData((prev) => ({
//       ...prev,
//       [key]: e.target.value,
//     }));
//   };

//   const handleNext = () => {
//     const mergedData = { ...godata, ...data };

//     dispatch(adduser(mergedData));
//     dispatch(addnewCustmer(mergedData)); // optional depending on your logic

//     setActiveTab("Additional Information");
//   };

//   return (
//     <div className="p-4 bg-white rounded-xl shadow-xl max-w-8xl mx-auto">
//       <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
//         Group Information
//       </h2>

//       <div className="grid grid-cols-2 gap-6">
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Group ID</label>
//           <input
//             type="text"
//             placeholder="Enter Group ID"
//             className={inputClass}
//             value={data.groupId}
//             onChange={handleChange("groupId")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Group Membership Fee</label>
//           <input
//             type="text"
//             placeholder="Enter Membership Fee"
//             className={inputClass}
//             value={data.groupFee}
//             onChange={handleChange("groupFee")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Group Name</label>
//           <input
//             type="text"
//             placeholder="Enter Group Name"
//             className={inputClass}
//             value={data.groupName}
//             onChange={handleChange("groupName")}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-1">Address</label>
//           <input
//             type="text"
//             placeholder="Enter Address"
//             className={inputClass}
//             value={data.address}
//             onChange={handleChange("address")}
//           />
//         </div>

//         <div className="mb-4 col-span-2">
//           <label className="block font-medium mb-1">Reference Person</label>
//           <input
//             type="text"
//             placeholder="Enter Reference Person's Name"
//             className={inputClass}
//             value={data.referencePerson}
//             onChange={handleChange("referencePerson")}
//           />
//         </div>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button
//           className="bg-gray-400 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-gray-500 transition"
//           onClick={() => setActiveTab("Emergency Contacts")}
//         >
//           Back
//         </button>

//         <button
//           className="bg-blue-600 text-white text-lg px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GroupInformationForm;
