// newmember_delhi_new_delhi_saket_branch
import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router'
import databranch from '../../data/branch.json'
import axios from 'axios'
import { HOSTURL } from '../../../utils/constant'

const EditMemberInfo = ({ list, setlist }) => {
  
  const [searchkey ,setsearchKey]=useState('memberID')
  const [searchvalue,setSearchValue]=useState('')
  const [found,setfound]=useState(false)
  const { state, city, branch } = useParams();
  const data=JSON.parse(localStorage.getItem(branch)) || []
  const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const handleSearch = async() => {
    try {
    const res = await fetch(`${HOSTURL}/api/newmember/${state}/${city}/${branch}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const found = data.find(
      (person) => person.memberID?.toString() === searchvalue.trim()
    );

    if (found) {
      setlist(found);
      setfound(true);
      alert("Member found");
    } else {
      alert("Member not found");
      setfound(false);
    }
  } catch (err) {
    console.error("Error searching member:", err.message);
    alert("Failed to fetch member data");
  }
  };

return (
  <div className="flex flex-col items-center  ">
    <div className='flex w-[1020px] px-30 rounded border p-6 bg-white shadow-lg gap-4 items-center'>
      <select 
        value={searchkey} 
        onChange={(e) => setsearchKey(e.target.value)}
        className='border rounded px-3 py-2 w-[250px] bg-slate-200'
      >
        {/* <option value="aadhaar">Aadhaar</option> */}
        <option value="memberID">Member ID</option>
        {/* <option value="pancard">PAN Card</option> */}
      </select>

      <input 
        type="text"
        value={searchvalue}
        onChange={(e) => setSearchValue(e.target.value)}
        className='w-[400px] border rounded bg-slate-200 px-3 py-2'
        placeholder='Enter value to search'
      />

      <button 
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 w-64 rounded hover:bg-slate-700 transition"
      >
        Search
      </button>
    </div>
    {found && (<>
  

   <div className="w-[1020px] overflow-x-auto mt-6">
   <table className="min-w-full text-sm text-gray-800 border rounded-md shadow-sm">
     <thead className="bg-indigo-100 text-indigo-800 font-semibold text-sm">
       <tr>
         <th className="px-4 py-2 text-left">First Name</th>
         <th className="px-4 py-2 text-left">Last Name</th>
         <th className="px-4 py-2 text-left">Aadhaar No.</th>
         <th className="px-4 py-2 text-left">Member ID</th>
       </tr>
     </thead>
     <tbody>
       <tr className="border-t">
         <td className="px-4 py-2">{list.firstName}</td>
         <td className="px-4 py-2">{list.lastName}</td>
         <td className="px-4 py-2">{list.aadhaar}</td>
         <td className="px-4 py-2">{list.memberID}</td>
         
         
       </tr>
     </tbody>
   </table>
 </div>
 </>
)}
</div>
)}

const TransferMembershipForm = () => {  
  const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const [countryName, setCountryName] = useState('India');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [brancheName, setBrancheName] = useState("");
  const [countries, setCountries] = useState([]);
  const [branches, setBranches] = useState([]);
  const [states, setStates] = useState([]);
  const [citys, setCitys] = useState([]);
  const [memberToTransfer, setMemberToTransfer] = useState(null);
  const {state,city,branch}=useParams();
  useEffect(() => {
    setCountries(databranch.countries);
  }, []);

  useEffect(() => {
    if (countryName) {
      const selectedCountry = countries.find(c => c.country_name === countryName);
      setStates(selectedCountry ? selectedCountry.states : []);
    } else {
      setStates([]);
    }
  }, [countryName, countries]);


  useEffect(() => {
    if (stateName) {
      const selectedState = states.find(s => s.state_name === stateName);
      setCitys(selectedState ? selectedState.cities : []);
    } else {
      setCitys([]);
    }
  }, [stateName, states]);

  useEffect(() => {
    if (cityName) {
      const selectedCity = citys.find(city => city.city_name === cityName);
      setBranches(selectedCity ? selectedCity.branches : []);
    } else {
      setBranches([]);
    }
  }, [cityName, citys]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (countryName && stateName && cityName && brancheName  ) {
      const state = stateName.split(" ").join("_")
      const city = cityName.split(" ").join("_")
      const Branch = brancheName.split(" ").join("_")
    }
  };
const Transfer=async()=>{
  const Branch = brancheName.split(" ").join("_")
    
 // Step 1: Generate short branch code (first letters of first two words)
const branchParts = brancheName.split(" ");
const sum = branchParts.slice(0, 2).map(word => word[0].toUpperCase()).join("");

// Step 2: Create base member ID
const memberIDBase = `${cityName[0].toUpperCase()}${stateName[0].toUpperCase()}${sum}`;

// Step 3: Append original memberID value from memberToTransfer
const originalMemberID = memberToTransfer.memberID; // assuming memberID is a property
const newmemberid = memberIDBase + originalMemberID.slice(4);

// Step 4: Create updated member object
const newbranch = {
  ...memberToTransfer,
  memberID: newmemberid
};

// console.log(newbranch);
     
      // const branchd = branch.split(" ");
      // const sum = branchd.slice(0, 2).map(word => word[0].toUpperCase()).join("");
     
      // const memberid=(`${city[0].toUpperCase()}${state[0].toUpperCase()}${sum}`+randomNumber+));
     

      // Add new customer
      // people.push(list);
       if (countryName && stateName && cityName && brancheName  ) {
      const state = stateName.split(" ").join("_")
      const city = cityName.split(" ").join("_")
      const Branch = brancheName.split(" ").join("_")
    }
      if(newbranch.status=="active"){
        alert("member can not transfer becouse account is active")
      }
      else{
      // actual transfer
       
       try {
      const res = await fetch(`${HOSTURL}/api/newmember/transferMember/${stateName}/${cityName}/${brancheName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newbranch,status:"Active", cityName, brancheName, stateName }),
      });

      const data = await res.json();
if (!res.ok) {
  alert(`Erro: ${data.message || "Failed to transfer member"}`);
  return;
  
}

       const payload = { status:"Closed" };
  const memberId=memberToTransfer.memberID
      await axios.put(
       `${HOSTURL}/api/newmember/${state}/${city}/${branch}/${memberId}`,
        payload
      );

} catch (err) {
  console.log("gggggggggggg",err)
    }

    // Read from localStorage safely
    
  
       
       
  //      const payload = { status:"Closed" };
  // const memberId=memberToTransfer.memberID
  //     await axios.put(
  //      `http://localhost:8000/api/newmember/${state}/${city}/${branch}/${memberId}`,
  //       payload
  //     );
      console.log(memberId)
        alert("Member was successfully transferred.");
  
      }
          }
  return (
<>
    <div className="p-8 bg-white rounded-xl shadow-xl max-w-6xl -mt[600px]">
      
      <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">
        Transfer Membership
      </h2>
      {/* Current Branch/Group */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          Current Branch/Group
        </h3>
        
        <EditMemberInfo list={memberToTransfer} setlist={setMemberToTransfer} />


        
      </div>

      {/* Updated Branch/Group */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          Updated
        </h3>
       

        <div className="flex w-full max-w-5xl mx-auto">
  <div className="bg-white p-8 rounded-xl shadow-md w-full">
    <h2 className="text-xl font-semibold mb-6 text-center text-indigo-700 border-b pb-2">
      Select New Branch
    </h2>

    <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
      <select
        name="state"
        onChange={(e) => setStateName(e.target.value)}
        value={stateName}
        required
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select State</option>
        {states.map((state, idx) => (
          <option key={idx} value={state.state_name}>
            {state.state_name}
          </option>
        ))}
      </select>

      <select
        name="city"
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}
        required
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select City</option>
        {citys.map((city, idx) => (
          <option key={idx} value={city.city_name}>
            {city.city_name}
          </option>
        ))}
      </select>

      <select
        name="branch"
        required
        onChange={(e) => setBrancheName(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select Branch</option>
        {branches.map((branch, idx) => (
          <option key={idx} value={branch.branch_name}>
            {branch.branch_name}
          </option>
        ))}
      </select>

      {branches.length === 0 && cityName && (
        <p className="col-span-full text-center text-sm text-gray-500">
          No branches available for this city.
        </p>
      )}

      <button
        type="submit"
        className="col-span-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        onClick={Transfer}>
        Transfer
      </button>
    </form>
  </div>
</div>

{memberToTransfer&&<div className="w-[1020px] overflow-x-auto mt-6">
   <table className="min-w-full text-sm text-gray-800 border rounded-md shadow-sm">
     <thead className="bg-indigo-100 text-indigo-800 font-semibold text-sm">
       <tr>
         <th className="px-4 py-2 text-left">First Name</th>
         <th className="px-4 py-2 text-left">Last Name</th>
         <th className="px-4 py-2 text-left">Aadhaar No.</th>
         <th className="px-4 py-2 text-left">Member ID</th>
       </tr>
     </thead>
     <tbody>
       <tr className="border-t">
         <td className="px-4 py-2">{memberToTransfer.firstName}</td>
         <td className="px-4 py-2">{memberToTransfer.lastName}</td>
         <td className="px-4 py-2">{memberToTransfer.aadhaar}</td>
         <td className="px-4 py-2">{memberToTransfer.memberID}</td>
         
         
       </tr>
     </tbody>
   </table>
 </div>}
       
        
      </div>
    </div>
    </>  );
};

export default TransferMembershipForm;
