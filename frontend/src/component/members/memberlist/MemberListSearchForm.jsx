import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { HOSTURL } from '../../../utils/constant'

const EditMemberInfo = ({ list , setlist }) => {

  const [searchkey ,setsearchKey]=useState('memberID')
  const [searchvalue,setSearchValue]=useState('')
  const [found,setfound]=useState(false)
  const { state, city, branch } = useParams(); 

  const [data,setdata]=useState([])

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const res = await fetch(`${HOSTURL}/api/newmember/${state}/${city}/${branch}`);
        const datas = await res.json();
        if (!res.ok) throw new Error(datas.message);
        setdata(datas);
        console.log(datas)
      } catch (err) {
        console.log("Error fetching cheques: " + err.message);
      }
    };
    fetchCheques();
  }, [state,city,branch]);

  const handleSearch=()=>{
    if (!searchvalue.trim()) {
      alert("Please enter a value to search.");
      return;
    }

    const result = data.find((li) => li[searchkey] == searchvalue);
    if (result) {
      setlist(result)
      console.log(result)
      setfound(true)
    } else {
      setlist(null)
      setfound(false)
    }
  }

  return (
    <div className="flex flex-col items-center mb-10 bg-gray-50 ">
      <div className='flex w-[950px] px-20 rounded border p-6 bg-white shadow-lg gap-4 items-center'>
        <select 
          value={searchkey} 
          onChange={(e) => setsearchKey(e.target.value)}
          className='border rounded px-3 py-2 w-[250px] bg-slate-200'
        >
          <option value="memberID">Member ID</option>
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

    </div>
  )
}

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const MemberListSearchForm = () => {
  const [memberToTransfer, setMemberToTransfer] = useState(null);

  return (
    <div className="p-8 bg-white rounded-xl shadow-xl max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3">
        Member Search 
      </h2>
      <EditMemberInfo list={memberToTransfer} setlist={setMemberToTransfer} />

      {memberToTransfer && <div className="grid grid-cols-4 gap-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Member ID</label>
          <input type="text" value={memberToTransfer?.memberID || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Member Name</label>
          <input type="text" value={memberToTransfer?.firstName + " " + memberToTransfer?.lastName || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Membership Date (From)</label>
          <input type="text" value={memberToTransfer?.date || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">KYC (done by)</label>
          <input type="text" value={
            memberToTransfer?.aadhaar
              ? 'Aadhaar'
              : memberToTransfer?.drivingLicense
              ? 'Driving License'
              : ''
          } className={inputClass}/>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Group Name</label>
          <input type="text" value={memberToTransfer?.groupName || ''} className={inputClass}/>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Address</label>
          <input type="text" value={memberToTransfer?.address || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Contact No</label>
          <input type="text" value={memberToTransfer?.phoneNumber || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Permanent Address</label>
          <input type="text" value={memberToTransfer?.address || ''} className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">City</label>
          <input type="text" value={memberToTransfer?.city || ''} placeholder="City" className={inputClass} />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Location</label>
          <input type="text" value={memberToTransfer?.postalCode || ''} placeholder="Location" className={inputClass} />
        </div>
      </div>}
    </div>
  );
};

export default MemberListSearchForm;
