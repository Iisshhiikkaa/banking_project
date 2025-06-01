// GroupReportPage.jsx
import React, { useEffect, useState } from 'react';
import GroupReport from './GroupReport';
import { useParams } from 'react-router';
import { HOSTURL } from '../../../utils/constant';

const GroupReportPage = () => {
  
     const {city,branch,state}=useParams()
    // const { branch } = useParams();
  const formattedBranch = decodeURIComponent(branch); // In case branch has spaces or underscores
  
    // const people = JSON.parse(localStorage.getItem(branch)) || [];
  const [people,setpeople]=useState([])
     useEffect(() => {
        const fetchCheques = async () => {
          try {
            const res = await fetch(`${HOSTURL}/api/newmember/${state}/${city}/${branch}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setpeople(data);
            console.log(data)
          } catch (err) {
            console.log("Error fetching cheques: " + err.message);
          }
        };
    
        fetchCheques();
      }, [city, branch, state]);
  // Fetch members from localStorage using the branch name
  const memberList = people


  
  return (
    <div>
      <GroupReport data={memberList} />
    </div>
  );
};

export default GroupReportPage;
