import React, { useState } from "react";
import {
  User,
  IdCard,
  CreditCard,
  Phone,
  Users,
  Info,
} from "lucide-react";
import PersonalInfoForm from "./PersonalInfoForm";
import IdentificationForm from "./IdentificationForm";
import FinancialInfoForm from "./FinancialInfoForm";
import EmergencyContactForm from "./EmergencyContactForm";
import GroupInformationForm from "./GroupInformationForm";
import AdditionalInformationForm from "./AdditionalInformationForm";

const tabs = [
  { label: "Personal Information", icon: <User size={16} /> },
  { label: "Identification", icon: <IdCard size={16} /> },
  { label: "Financial Information", icon: <CreditCard size={16} /> },
  { label: "Emergency Contacts", icon: <Phone size={16} /> },
  { label: "Group Information", icon: <Users size={16} /> },
  { label: "Additional Information", icon: <Info size={16} /> },
];

const NewMember = () => {
  const [activeTab, setActiveTab] = useState("Personal Information");

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Information":
        return (<PersonalInfoForm setActiveTab={setActiveTab}/>)
      case "Identification":
        return (<IdentificationForm setActiveTab={setActiveTab}/>);
      ;
      case "Financial Information":
        return (<FinancialInfoForm setActiveTab={setActiveTab}/>);
      case "Emergency Contacts":
        return  (<EmergencyContactForm setActiveTab={setActiveTab}/>);
      case "Group Information":
        return (<GroupInformationForm setActiveTab={setActiveTab}/>);
      case "Additional Information":
        return (<AdditionalInformationForm setActiveTab={setActiveTab}/>);
      default:
        return null;
    }
  };
  
  return (
    <div className="pt-1 ml-10 w-[1200px] p-4 ">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${
              activeTab === tab.label
                ? "border-b-2 border-blue-500 text-blue-600 bg-blue-50 rounded-t"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 border rounded bg-white shadow">
        {renderContent()}
      </div>
    </div>
  );
};

export default NewMember;