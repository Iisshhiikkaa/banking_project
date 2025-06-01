import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



  
  const GroupReport = ({ data }) => {
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
                <th className="border p-2">Account number</th>
                <th className="border p-2">Leader</th>
                <th className="border p-2">groupType</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">City</th>
                <th className="border p-2">registrationNumber</th>
                <th className="border p-2">Group Name</th>
                <th className="border p-2">meeting peron</th>

               <th className="border p-2">initialDeposit</th>
                <th className="border p-2">savingsPerMember</th>

              </tr>
            </thead>
            <tbody>
              {data.map((member, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <td className="border p-2">{member.accountID}</td>
                  <td className="border p-2">{member.groupLeader} </td>
                  <td className="border p-2">{member.groupType}</td>
                  <td className="border p-2">{member.groupAddress}</td>
                  <td className="border p-2">{member.gpcity}</td>
                  <td className="border p-2">{member.registrationNumber}</td>
                  <td className="border p-2">{member.groupName}</td>
                  <td className="border p-2">{member.meetingFrequency}</td>
                  
                                    <td className="border p-2">{member.initialDeposit}</td>

                  <td className="border p-2">
                  {member.savingsPerMember}
                  </td>
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

export default GroupReport;
