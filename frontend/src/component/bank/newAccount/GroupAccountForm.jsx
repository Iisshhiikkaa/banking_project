import React, { useState } from "react";
import { useParams } from "react-router";
import { HOSTURL } from "../../../utils/constant";

function GroupAccountForm() {

  const {city,branch,state}=useParams()

  const [formData, setFormData] = useState({
    groupName: "",
    groupType: "",
    registrationNumber: "",
    dateOfFormation: "",
    groupAddress: "",
    purpose: "",
    members: "",
    authorizedSignatories: "",
    groupLeader: "",
    meetingFrequency: "",
    affiliatedInstitution: "",
    savingsPerMember: "",
    gpbranch: "",
    accountType: "Joint Savings",
    initialDeposit: "",
    gpcity: "",
    gpstate: "",
    memberID: "",
    otherGroupType: "",
  });

  const [createdAccount, setCreatedAccount] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateGroupAccountID = ( originalID) => {
  
    return `GP${originalID}`;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const date = new Date();
    const dateCreated = date.toISOString().split("T")[0];

    const accountID = generateGroupAccountID(
      
      formData.memberID || "Gp"
    );

    const groupAccount = {
      ...formData,
      members: formData.members.split(",").map((name) => name.trim()),
      dateCreated,
      groupType: formData.groupType === "Other" ? formData.otherGroupType : formData.groupType,
      initialDeposit: Number(formData.initialDeposit),
      savingsPerMember: Number(formData.savingsPerMember),
      accountID,
      
    };



    try {
      const res = await fetch(`${HOSTURL}/api/bank/GroupAccountRegister`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...groupAccount, city, branch, state }),
      });

      const data = await res.json();
if (!res.ok) {
  alert(`Erro: ${"Already registerded" || "Failed to add member"}`);
  return; 
}
  alert("successfulyy created group account")

} catch (err) {
  console.log("gggggggggggg",err)
    }

   setFormData({ groupName: "",
    groupType: "",
    registrationNumber: "",
    dateOfFormation: "",
    groupAddress: "",
    purpose: "",
    members: "",
    authorizedSignatories: "",
    groupLeader: "",
    meetingFrequency: "",
    affiliatedInstitution: "",
    savingsPerMember: "",
    gpbranch: "",
    accountType: "Joint Savings",
    initialDeposit: "",
    gpcity: "",
    gpstate: "",
    memberID: "",
    otherGroupType: ""})
    
    // Add new customer
    // setCreatedAccount(groupAccount);
  };

  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-6 bg-white rounded-xl shadow-xl max-w-7xl mx-auto">
      {/* <h2 className="text-2xl font-bold text-blue-700 mb-6">Group Account Information</h2> */}

      <h2 className="text-2xl font-bold text-blue-700 mb-8 border-b-2 border-gray-200 pb-3">
      Group Account Information      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Group Name</label>
          <input name="groupName" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Group Type</label>
          <select name="groupType" onChange={handleChange} className={inputClass}>
            <option value="">Select Group Type</option>
            <option value="SHG">Self Help Group (SHG)</option>
            <option value="Club">Club</option>
            <option value="Cooperative">Cooperative</option>
            <option value="NGO">NGO</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.groupType === "Other" && (
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Specify Other Group Type</label>
            <input name="otherGroupType" onChange={handleChange} className={inputClass} />
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700 mb-1">Registration Number</label>
          <input name="registrationNumber" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Date of Formation</label>
          <input type="date" name="dateOfFormation" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Group Address</label>
          <input name="groupAddress" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Purpose</label>
          <select name="purpose" onChange={handleChange} className={inputClass}>
            <option value="">Select Purpose</option>
            <option value="Savings">Savings</option>
            <option value="Loan Repayment">Loan Repayment</option>
            <option value="Welfare">Welfare Activities</option>
            <option value="Emergency Fund">Emergency Fund</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Authorized Signatories</label>
          <input name="authorizedSignatories" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Group Leader / Chairperson</label>
          <input name="groupLeader" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Meeting Frequency</label>
          <input name="meetingFrequency" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Affiliated Institution</label>
          <input name="affiliatedInstitution" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Monthly Savings per Member</label>
          <input name="savingsPerMember" type="number" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Branch</label>
          <input name="gpbranch" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">City</label>
          <input name="gpcity" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">State</label>
          <input name="gpstate" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Original Member ID</label>
          <input name="memberID" onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Account Type</label>
          <select name="accountType" onChange={handleChange} className={inputClass}>
            <option>Joint Savings</option>
            <option>Group Current</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Initial Deposit</label>
          <input name="initialDeposit" type="number" onChange={handleChange} className={inputClass} />
        </div>

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">Members (comma-separated)</label>
          <textarea name="members" onChange={handleChange} className={inputClass} />
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Account
          </button>
        </div>
      </form>

      {/* {createdAccount && (
        <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
          <h3 className="font-semibold text-lg mb-2">Group Account Created:</h3>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(createdAccount, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}

export default GroupAccountForm;
