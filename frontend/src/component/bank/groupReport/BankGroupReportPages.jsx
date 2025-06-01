// GroupReportPage.jsx
import React, { useEffect, useState } from 'react';
import GroupReport from './GroupReport';
import { useParams } from 'react-router';
import { HOSTURL } from '../../../utils/constant';

const BankGroupReportPage = () => {
    const {state,city ,branch } = useParams();
  const formattedBranch = decodeURIComponent(branch); // In case branch has spaces or underscores

  // Fetch members from localStorage using the branch name
  const [memberList ,setmemberList]=useState([]) ;
  // const [data,setdata]=useState([])
  
    useEffect(() => {
      const fetchCheques = async () => {
        try {
          const res = await fetch(`${HOSTURL}/api/bank/${state}/${city}/${branch}`);
          const datas = await res.json();
          if (!res.ok) throw new Error(datas.message);
          setmemberList(datas);
          console.log(datas)
        } catch (err) {
          console.log("Error fetching cheques: " + err.message);
        }
      };
      fetchCheques();
    }, [state,city,branch]);
  

  return (
    <div>
      <GroupReport data={memberList} />
    </div>
  );
};

export default BankGroupReportPage;
