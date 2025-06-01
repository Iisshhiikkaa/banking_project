import { useParams } from "react-router";

const Header = ({ toggleSidebar }) => {
  const {state,city,branch}=useParams()
    return (
      <header className="bg-gray-800 text-white flex justify-between items-center p-2">
        <button className="text-2xl" onClick={toggleSidebar}>
          ☰   
        </button>
    <div> {state} , {city } , {branch} branch</div>
        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>
    );
  };
  
  export default Header;
  