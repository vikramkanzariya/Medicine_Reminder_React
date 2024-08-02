import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/medication/reports');
        console.log(response);
        setReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Weekly Reports</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Report id</th>
            <th className="py-2 px-4 border-b text-center">start date</th>
            <th className="py-2 px-4 border-b text-center">end date</th>
            <th className="py-2 px-4 border-b text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {reports.length>0 ? reports.map((report) => (
            <tr key={report.id}>
              <td className="py-2 px-4 border-b text-center">{report.id}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(new Date(report.report_date).getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split("T")[0]}</td>
              <td className="py-2 px-4 border-b text-center">{new Date(report.report_date).toISOString().split("T")[0]}</td>
              <td className="py-2 px-4 border-b text-center">
                <a
                  href={report.file_path}
                  className="no-underline bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Download
                </a>
              </td>
            </tr>
          )): <tr><td colSpan={4} className='py-2 px-4 border-b text-center'>No Data Found!</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
