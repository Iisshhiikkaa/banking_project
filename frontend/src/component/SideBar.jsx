
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
  ChevronDownIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  openDropdown,
  toggleDropdown,
  handleOptions,
  itemsdata,
  menuItems
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-100 text-gray-900 transition-transform transform z-40 shadow-md overflow-y-scroll  ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
    >
      {/* Close button */}
      <button className="text-2xl" onClick={() => setSidebarOpen(false)}>
        <img
          src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png"
          className="w-7 ml-52 bg-slate-300 mt-3"
          alt="close"
        />
      </button>

      {/* Sidebar menu */}
      <div className="mt-16 px-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.type === 'link' ? (
              <a
                href="#"
                onClick={() => handleOptions(item.name)}
                className="flex items-center gap-3 py-2 px-2 hover:bg-gray-200 rounded"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </a>
            ) : (
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full flex items-center justify-between py-2 px-2 hover:bg-gray-200 rounded"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
                {openDropdown === item.name && (
                  <div className="pl-8 text-sm">
                    {(itemsdata[item.name] || []).map((subItem, idx) => (
                    <Link
                    to={`${subItem.name.toLowerCase().replaceAll(' ', '')}`}
                    key={idx}
                    className="flex items-center gap-2 py-1 px-2 hover:bg-gray-200 rounded"
                  >
                    {subItem.icon ? <subItem.icon className="h-4 w-4" /> : null}
                    {subItem.name}
                  </Link>
                  
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
