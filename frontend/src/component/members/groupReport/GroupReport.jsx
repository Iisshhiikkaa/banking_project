import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GroupReport = ({ data }) => {
  const reportRef = useRef();

  const downloadPDF = async () => {
    const input = reportRef.current;
    if (!input) return;

    window.scrollTo(0, 0); // Ensure full capture

    const canvas = await html2canvas(input, {
      scale: 3, // Higher scale for sharper PDF
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
    <div
      className="p-8 rounded shadow-lg max-w-6xl mx-auto"
      style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}
    >
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "#1d4ed8", fontFamily: "Arial, sans-serif" }}
      >
        Group Report
      </h2>

      <div
        ref={reportRef}
        className="p-6 rounded border overflow-auto"
        style={{
          backgroundColor: "#f9fafb",
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
          color: "#111827",
        }}
      >
        {data?.length > 0 ? (
          <table className="w-[1000px] table-auto border-collapse  h-7 m-4 text-[10px]">
            <thead className="p-2 h-7" style={{ backgroundColor: "#dbeafe" }}>
              <tr>
                <th className="border p-2">Member ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Postal Code</th>
                <th className="border p-2">Group Name</th>
                <th className="border p-2">Reg Date</th>
                <th className="border p-2">KYC Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 h-7 -mt-3 text-center  p-3  "
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <td className="border p-2">{member.memberID}</td>
                  <td className="border p-2">
                    {member.firstName} {member.lastName}
                  </td>
                  <td className="border p-2">{member.phone}</td>
                  <td className="border p-2">{member.address}</td>
                  <td className="border p-2">{member.city}</td>
                  <td className="border p-2">{member.postalCode}</td>
                  <td className="border p-2">{member.groupName}</td>
                  <td className="border p-2">{member.date}</td>
                  <td className="border p-2">
                    {member.aadhaar
                      ? "Aadhaar"
                      : member.drivingLicense
                      ? "Driving License"
                      : "N/A"}
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
        style={{ backgroundColor: "#16a34a", fontFamily: "Arial, sans-serif" }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default GroupReport;
