import React, { useState } from "react";
import {
  User,
  IdCard,
  CreditCard,
  Phone,
  Users,
  Info,
} from "lucide-react";

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
        return (
        <><div>This is Personal Information</div>
            <button className="bg-black text-2xl text-white"
            onClick={() => setActiveTab("Identification")}
            >next</button></>
        )
      case "Identification":
        return <div>This is Identification</div>;
      case "Financial Information":
        return <div>This is Financial Information</div>;
      case "Emergency Contacts":
        return <div>This is Emergency Contacts</div>;
      case "Group Information":
        return <div>This is Group Information</div>;
      case "Additional Information":
        return <div>This is Additional Information</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
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