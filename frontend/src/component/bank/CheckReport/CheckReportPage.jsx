

  
// GroupReportPage.jsx
// import React, { useState } from 'react';

import { useParams } from 'react-router';
import CheckReport from './CheckReport';
import { useEffect ,useState} from 'react';
import { HOSTURL } from '../../../utils/constant';

const CheckReportPage = () => {
    const { city,state,branch } = useParams();
  const formattedBranch = decodeURIComponent(branch); // In case branch has spaces or underscores

  // Fetch members from localStorage using the branch name
  const [memberList ,setmemberList]=useState([]) ;
  
  
    useEffect(() => {
      const fetchCheques = async () => {
        try {
          const res = await fetch(`${HOSTURL}/api/cheque/${state}/${city}/${branch}`);
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
      <CheckReport data={memberList} />
    </div>
  );
};

export default CheckReportPage
