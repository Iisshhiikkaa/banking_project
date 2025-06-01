// import React from 'react'
// import BranchSelector from './BranchSelector'
// // import SideBar from './SideBar'
// import { Outlet } from 'react-router'
// import NewMember from './members/NewMember'


  import react,{ useState } from 'react';
  import Header from './Header';
  import Sidebar from './SideBar';
  import MainContainer from './MainContainer';
  import {
    HomeIcon,
    Cog6ToothIcon,
    ArrowsRightLeftIcon,
    BanknotesIcon,
    UsersIcon,
    CurrencyDollarIcon,
    ClipboardDocumentIcon,
    CalendarDaysIcon,
    ClockIcon,
    BuildingLibraryIcon,
    ChartBarIcon,
    DocumentChartBarIcon
  } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router';
const DashBoard=()=> {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [data1, setData] = useState([]);
  
    const toggleDropdown = (name) => {
      setOpenDropdown(openDropdown === name ? null : name);
    };
  
    const handleOptions = (key) => {
      setData(itemsdata[key] || []);
    };
  
    const menuItems = [
      { name: 'Dashboard', icon: HomeIcon, type: 'link' },
      { name: 'Masters', icon: Cog6ToothIcon, type: 'dropdown' },
      { name: 'Transactions', icon: ArrowsRightLeftIcon, type: 'dropdown' },
      { name: 'Accounting', icon: BanknotesIcon, type: 'dropdown' },
      { name: 'Members', icon: UsersIcon, type: 'dropdown' },
      { name: 'Savings', icon: CurrencyDollarIcon, type: 'dropdown' },
      { name: 'Loan', icon: ClipboardDocumentIcon, type: 'dropdown' },
      { name: 'Daily', icon: CalendarDaysIcon, type: 'dropdown' },
      { name: 'Recurring', icon: ClockIcon, type: 'dropdown' },
      { name: 'Bank', icon: BuildingLibraryIcon, type: 'dropdown' },
      { name: 'Shares', icon: ChartBarIcon, type: 'link' },
      { name: 'Investment', icon: CurrencyDollarIcon, type: 'link' },
      { name: 'Reports', icon: DocumentChartBarIcon, type: 'link' }
    ];
  
    const itemsdata = {
      Accounting: [
        { name: 'Bank', icon: BuildingLibraryIcon },
        { name: 'Shares', icon: ChartBarIcon },
        { name: 'Investment', icon: CurrencyDollarIcon },
        { name: 'Reports', icon: DocumentChartBarIcon }
      ],
      Transactions: [
        { name: 'Bank' },
        { name: 'Shares' },
        { name: 'Investment' },
        { name: 'Reports' }
      ],
      Masters:[
        { name:"member List"},
      ]
      ,
      Bank:[
        { name:"new Bank Account"},
        {name:"bank Account List"},
        {name:"check Register"},
        {name:'Reconsilition'},
        {name:"bank Report"},
        {name:"cheque Report"}
,
        

      ],
      Members: [
        { name: 'New Member' },
        { name: 'Member Search List' },
        { name: 'Edit member' },
        { name: 'Mamber transfer' },
        // { name: 'Mamber Reports' },
        {name:"Group Report"}
      ],
      Savings: [
        { name: 'open Account', icon: BuildingLibraryIcon },
        {name:'Account Register List' ,icon:DocumentChartBarIcon},
        {name: 'Transactions',icon: CurrencyDollarIcon },
         
        // { name: 'Shares', icon: ChartBarIcon },
        // { name: 'Investment', icon: CurrencyDollarIcon },
        // { name: 'Reports', icon: DocumentChartBarIcon },
      ],
      Loan: [
        { name: 'Bank', icon: BuildingLibraryIcon },
        { name: 'Shares', icon: ChartBarIcon },
        { name: 'Investment', icon: CurrencyDollarIcon },
        { name: 'Reports', icon: DocumentChartBarIcon }
      ],
      Daily: [
        { name: 'Bank', icon: BuildingLibraryIcon },
        { name: 'Shares', icon: ChartBarIcon },
        { name: 'Investment', icon: CurrencyDollarIcon },
        { name: 'Reports', icon: DocumentChartBarIcon }
      ],
      Recurring: [
        { name: 'Bank', icon: BuildingLibraryIcon },
        { name: 'Shares', icon: ChartBarIcon },
        { name: 'Investment', icon: CurrencyDollarIcon },
        { name: 'Reports', icon: DocumentChartBarIcon }
      ]
    };
  
    return (
      <div className="h-screen flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            handleOptions={handleOptions}
            itemsdata={itemsdata}
            menuItems={menuItems}
          />
          <main className="flex-1 mx-[5%] shadow-2xl  p-6   ">
      <Outlet /> {/* Don't wrap it in <h1> */}
    </main>
        </div>
        
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    );
  }
  

  

export default  DashBoard
