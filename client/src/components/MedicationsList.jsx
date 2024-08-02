import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MedicationsList = () => {
  const [medications, setMedications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('/medication');
        console.log(response);
        setMedications(response.data.medications);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Medications</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Description</th>
            <th className="py-2 px-4 border-b text-center">Type</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.length>0 ? medications.map((medication) => (
            <tr key={medication.id}>
              <td className="py-2 px-4 border-b text-center">{medication.name}</td>
              <td className="py-2 px-4 border-b text-center">{medication.description}</td>
              <td className="py-2 px-4 border-b text-center">{medication.type}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => navigate(`/medications/${medication.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Show
                </button>
              </td>
            </tr>
          )): <tr><td colSpan={4} className='py-2 px-4 border-b text-center'>No Data Found!</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default MedicationsList;
