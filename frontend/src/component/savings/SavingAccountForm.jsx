import React, { useState } from 'react';
import { useParams } from 'react-router';
import { HOSTURL } from '../../utils/constant';

const SavingsAccountForm = () => {
  const inputClass =
    "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
    const { city, branch, state } = useParams();

  
    const [formData, setFormData] = useState({
      fullName: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      fatherName: '',
      nationality: '',
      occupation: '',
      mobile: '',
      email: '',
      permanentAddress: '',
      currentAddress: '',
      idProofType: '',
      idProofNumber: '',
      panNumber: '',
      accountType: 'Regular',
      initialDeposit: '',
      nomineeName: '',
      nomineeRelation: '',
      modeOfOperation: 'Single',
      debitCard: false,
      netBanking: false,
      smsAlerts: true,
      status:1,
      accountHolderCity:""  ,
      accountHolderState:"",
      State:state,
      City:city,
      Branch:branch,
  
    });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const people = JSON.parse(localStorage.getItem("SavingsAccount" + branch)) || [];
      const timestamp = Date.now().toString().slice(-7);
      const random = Math.floor(1000 + Math.random() * 900);
      const random1 = Math.floor(100 + Math.random() * 900);
     const accountnumber="9"+random+timestamp+random1
     
    const finalFormData = {
      ...formData,
      AccountNumber: accountnumber,
      state,
        city,
        branch,
    };
  try {
        const res = await fetch(HOSTURL+"/api/savingaccount/registerSavingAccount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalFormData),
        });
  
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
  setFormData({ fullName: '',
      dob: '',
      gender: '',
      maritalStatus: '',
      fatherName: '',
      nationality: '',
      occupation: '',
      mobile: '',
      email: '',
      permanentAddress: '',
      currentAddress: '',
      idProofType: '',
      idProofNumber: '',
      panNumber: '',
      accountType: 'Regular',
      initialDeposit: '',
      nomineeName: '',
      nomineeRelation: '',
      modeOfOperation: 'Single',
      debitCard: false,
      netBanking: false,
      smsAlerts: true,
      status:1,
      accountHolderCity:""  ,
      accountHolderState:"",
      State:state,
      City:city,
      Branch:branch,
  })
          alert("New member successfully added!");
      
      } catch (err) {
        alert("Error: " + err.message);
      }
    };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">Savings Account Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className={inputClass} />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} />
            <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
              <option value="">Gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={inputClass}>
              <option value="">Marital Status</option>
              <option>Single</option><option>Married</option>
            </select>
            <input name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father/Mother's Name" className={inputClass} />
            <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" className={inputClass} />
            <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" className={inputClass} />
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" className={inputClass} />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className={inputClass} />
            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent Address" className={inputClass} />
            <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" className={inputClass} />
       <div>
              <textarea placeholder='State' name="accountHolderState" value={formData.accountHolderState} onChange={handleChange} className={inputClass} />
            </div>
            <div>
            
              <textarea placeholder='City' name="accountHolderCity" value={formData.accountHolderCity} onChange={handleChange} className={inputClass} />
            </div>
       
          </div>
        </section>

        {/* KYC Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">KYC Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="idProofType" value={formData.idProofType} onChange={handleChange} className={inputClass}>
              <option value="">Select ID Proof</option>
              <option>Aadhaar</option><option>Passport</option><option>Voter ID</option><option>Driving License</option>
            </select>
            <input name="idProofNumber" value={formData.idProofNumber} onChange={handleChange} placeholder="ID Proof Number" className={inputClass} />
            <input name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="PAN Number" className={inputClass} />
          </div>
        </section>

        {/* Account Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="accountType" value={formData.accountType} onChange={handleChange} className={inputClass}>
              <option>Regular</option><option>Salary</option><option>Senior Citizen</option><option>Premium</option>
            </select>
            <input name="initialDeposit" value={formData.initialDeposit} onChange={handleChange} placeholder="Initial Deposit (₹)" className={inputClass} />
            <input name="nomineeName" value={formData.nomineeName} onChange={handleChange} placeholder="Nominee Name" className={inputClass} />
            <input name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} placeholder="Nominee Relationship" className={inputClass} />
            <select name="modeOfOperation" value={formData.modeOfOperation} onChange={handleChange} className={inputClass}>
              <option>Single</option><option>Joint</option><option>Either or Survivor</option>
            </select>
          </div>

          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="debitCard" checked={formData.debitCard} onChange={handleChange} />
              Debit Card
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="netBanking" checked={formData.netBanking} onChange={handleChange} />
              Internet Banking
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="smsAlerts" checked={formData.smsAlerts} onChange={handleChange} />
              SMS Alerts
            </label>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 shadow">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default SavingsAccountForm;
