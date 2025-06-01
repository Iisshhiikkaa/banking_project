// import React from 'react'

 import React, { useRef } from "react";
 import jsPDF from "jspdf";
 import html2canvas from "html2canvas";
 
 
 const CheckReport = ({ data }) => {

   
   
     const reportRef = useRef();
   
     const downloadPDF = async () => {
       const input = reportRef.current;
       if (!input) return;
   
       // Scroll to top to avoid capturing mid-scroll
       window.scrollTo(0, 0);
   
       const canvas = await html2canvas(input, {
         scale: 2,
         useCORS: true,
         width: input.scrollWidth,
         height: input.scrollHeight,
       });
   
       const imgData = canvas.toDataURL("image/png");
       const pdf = new jsPDF("landscape", "mm", "a4");
   
       const pdfWidth = pdf.internal.pageSize.getWidth();
       const pdfHeight = pdf.internal.pageSize.getHeight();
   
       const imgProps = {
         width: canvas.width,
         height: canvas.height,
       };
       const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
       const imgWidth = imgProps.width * ratio;
       const imgHeight = imgProps.height * ratio;
   
       let position = 0;
       let heightLeft = imgHeight;
   
       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
       heightLeft -= pdfHeight;
   
       while (heightLeft > 0) {
         position -= pdfHeight;
         pdf.addPage();
         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
         heightLeft -= pdfHeight;
       }
       pdf.save("group-report.pdf");
     };
   
   
   return (
     <div className="p-8 rounded shadow-lg max-w-6xl mx-auto" style={{ backgroundColor: "#ffffff" }}>
       <h2 className="text-2xl font-bold mb-4" style={{ color: "#1d4ed8" }}>
         Group Report
       </h2>
 
       <div
         ref={reportRef}
         className="p-6 rounded border overflow-auto"
         style={{ backgroundColor: "#f9fafb" }}
       >
         {data?.length > 0 ? (
           <table className="w-full table-auto border-collapse text-sm">
             <thead style={{ backgroundColor: "#dbeafe" }}>
               <tr>
                 <th className="p-2 border">Cheque Number</th>
              <th className="p-2 border">Issue Date</th>
              <th className="p-2 border">Payee</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Purpose</th>
              <th className="p-2 border">Status</th>
                  </tr>
             </thead>
             <tbody>
               {data.map((cheque, index) => (
                 <tr
                   key={index}
                   className="hover:bg-gray-100 text-center"
                   style={{ backgroundColor: "#ffffff" }}
                 >
                   {/* <td className="p-2 border text-center">{index + 1}</td> */}
                  <td className="p-2 border">{cheque.chequeNumber}</td>
                  <td className="p-2 border">{cheque.issueDate?.slice(0, 10)}</td>
                  <td className="p-2 border">{cheque.payeeName}</td>
                  <td className="p-2 border text-right">₹{parseFloat(cheque.amount).toFixed(2)}</td>
                  <td className="p-2 border">{cheque.purpose}</td>
                  <td className="p-2 border text-center">{cheque.status}</td>
             
                 </tr>
               ))}
             </tbody>
           </table>
         ) : (
           <p>No member data found.</p>
         )}
       </div>
 
       <button
         onClick={downloadPDF}
         className="mt-6 text-white px-6 py-2 rounded"
         style={{ backgroundColor: "#16a34a" }}
       >
         Download PDF
       </button>
     </div>
   );
 };
 

 

export default CheckReport
