import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { HOSTURL } from '../../../utils/constant';

const EditMemberInfo = () => {
  const { city, branch, state } = useParams();
  const [searchkey, setsearchKey] = useState('memberID');
  const [searchvalue, setSearchValue] = useState('');
  const [edit, setedit] = useState(false);
  const [list, setlist] = useState({});
  // const data = JSON.parse(localStorage.getItem(branch)) || [];

  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

//   const handleSearch = () => {
//     // const found = data.find((li) => li[searchkey] === searchvalue);
//     // if (found) {
//     //   setlist(found);
//     //   setedit(true);
//     // } else {
//     //   alert('Member not found');
//     // }

//  useEffect(() => {
//       const fetchCheques = async () => {
//         try {
//           const res = await fetch(`http://localhost:8000/api/newmember/${state}/${city}/${branch}`);
//           const data = await res.json();
//           if (!res.ok) throw new Error(data.message);
//           const filteredPeople = sortedPeople.filter(person =>
//   person.memberID?.toString().includes(searchvalue.trim()))
//             if (filteredPeople){
//           setlist(filteredPeople);
//               setedit(true);
//               alert("memberis found")
//             }
//             else{
//               alert("member is not found")
//             }
//           // console.log(data)
//         } catch (err) {
//           console.log("Error fetching cheques: " + err.message);
//         }
//       };
  
//       fetchCheques();
//     }, [searchvalue]);
 



//   };


const handleSearch = async () => {
  if (!searchvalue) return alert("Please enter a Member ID");

  try {
    const res = await fetch(`${HOSTURL}/api/newmember/${state}/${city}/${branch}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const found = data.find(
      (person) => person.memberID?.toString() === searchvalue.trim()
    );

    if (found) {
      setlist(found);
      setedit(true);
      alert("Member found");
    } else {
      alert("Member not found");
      setedit(false);
    }
  } catch (err) {
    console.error("Error searching member:", err.message);
    alert("Failed to fetch member data");
  }
};


  const handleChange = (key) => (e) => {
    const value =
      e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setlist((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


const updateInfo = async () => {
    try {
      const memberId = searchvalue.trim();
      if (!memberId) {
        alert('Member ID not found!');
        return;
      }
  
      const payload = { ...list };
  
      await axios.put(
       `${HOSTURL}/api/newmember/${state}/${city}/${branch}/${memberId}`,
        payload
      );
  
      alert('Member information updated successfully!');
      setedit(false);
  
      const res = await axios.get(
        `${HOSTURL}/api/newmember/${state}/${city}/${branch}`
      );
      // setMembers(res.data);
    } catch (error) {
      console.error('Error updating member info:', error);
      alert('Failed to update member information.');
    }
  };



  // const updateInfo = () => {
  //   updateMember()
  //   // console.log(list)
  //   // const updatedData = data.map((item) =>
  //   //   item[searchkey] === searchvalue ? { ...item, ...list } : item
  //   // );
  //   // localStorage.setItem(branch, JSON.stringify(updatedData));
  //   alert('Successfully updated');
  //   setedit(false);
  // };

  return (
    <div className="bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
        Edit Member
      </h2>
      <hr />

      <div className="flex w-[1000px] ml-36 rounded mt-5 border px-28 p-8 grid-cols-2 shadow-2xl">
        <div>
          <select
            value={searchkey}
            onChange={(e) => setsearchKey(e.target.value)}
            className="border rounded text-center px-3 py-2 w-[300px] bg-slate-200"
          >
            <option value="memberID">MemberID</option>
          </select>
        </div>
        <input
          type="text"
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[300px] border rounded bg-slate-200 ml-4 px-2"
          placeholder="Enter Member ID"
        />
        <button
          onClick={handleSearch}
          className="border rounded px-3 py-1 ml-4 text-white w-56 bg-slate-800"
          type="button"
        >
          Search
        </button>
      </div>

      {edit && (
        <div className="ml-36 mt-6 rounded shadow-2xl shadow-slate-700 w-[1000px] p-6 bg-white">
          <div className="text-2xl mb-4">Update Information</div>
          <div className="grid grid-cols-2 gap-10">

            
            {/* Personal Info */}
            <div>
              <div className="mb-5">
                <label className="block font-medium mb-1">Full Name</label>
                <div className="grid grid-cols-3 gap-3">
                  
                  
                  <input
                    type="text"
                    placeholder="First Name"
                    value={list.firstName || ''}
                    onChange={handleChange('firstName')}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={list.middleName || ''}
                    onChange={handleChange('middleName')}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={list.lastName || ''}
                    onChange={handleChange('lastName')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={list.dob || ''}
                  onChange={handleChange('dob')}
                  className={inputClass}
                />
                
               
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Status</label>
                
                 <input
                    type="text"
                    placeholder="active/inactive"
                    value={list.status || ''}
                    onChange={handleChange('status')}
                    className={inputClass}
                  />
               
              </div>


              <div className="mb-5">
                <label className="block font-medium mb-1">Gender</label>
                <select
                  value={list.gender || ''}
                  onChange={handleChange('gender')}
                  className={inputClass}
                >
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Marital Status</label>
                <select
                  value={list.maritalStatus || ''}
                  onChange={handleChange('maritalStatus')}
                  className={inputClass}
                >
                  <option>Select Status</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Nationality</label>
                <input
                  type="text"
                  value={list.nationality || ''}
                  onChange={handleChange('nationality')}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

              <div className="mb-5">
                <label className="block font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={list.email || ''}
                  onChange={handleChange('email')}
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={list.phone || ''}
                  onChange={handleChange('phone')}
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={list.address || ''}
                  onChange={handleChange('address')}
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">City</label>
                <input
                  type="text"
                  value={list.city || ''}
                  onChange={handleChange('city')}
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">State</label>
                <input
                  type="text"
                  value={list.state || ''}
                  onChange={handleChange('state')}
                  className={inputClass}
                />
              </div>

              <div className="mb-5">
                <label className="block font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  value={list.postalCode || ''}
                  onChange={handleChange('postalCode')}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <button
            onClick={updateInfo}
            className="mt-6 px-4 py-2 text-white rounded bg-slate-800 hover:bg-slate-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditMemberInfo;
