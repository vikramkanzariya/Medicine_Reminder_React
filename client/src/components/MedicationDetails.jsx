import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MedicationDetails = () => {
  const { id } = useParams();
  const [medication, setMedication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await axios.get(`/medication/${id}`);
        console.log(response)
        setMedication(response.data.medications);
      } catch (error) {
        console.error('Error fetching medication:', error);
      }
    };

    fetchMedication();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/medication/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting medication:', error);
    }
  };


  return (
    medication ? (<div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{medication.name}</h2>
      <p><strong>Description:</strong> {medication.description}</p>
      <p><strong>Type:</strong> {medication.type}</p>
      <p><strong>Start Date:</strong> {medication.start_date}</p>
      {medication.type === 'recurring' && <p><strong>End Date:</strong> {medication.end_date}</p>}
      <p><strong>Time:</strong> {medication.time}</p>
      {medication.type === 'recurring' && <p><strong>Frequency:</strong> {medication.frequency}</p>}
      {medication.frequency === 'weekly' && <p><strong>Day of the Week:</strong> {medication.day_of_week}</p>}

      <div className="mt-4">
        <button
          onClick={() => navigate(`/medications/${id}/edit`)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      <h3 className="text-xl font-bold mt-8">Logs</h3>
      <table className="min-w-full bg-white mt-4 border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300 text-center">Taken At</th>
            <th className="py-2 px-4 border border-gray-300 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {medication.medication_logs.length ? medication.medication_logs.map((log) => (
            <tr key={log.id}>
              <td className="py-2 px-4 border border-gray-300 text-center">{log.taken_at ? new Date(log.taken_at).toLocaleString() : "-"}</td>
              <td className="py-2 px-4 border border-gray-300 text-center">{log.status}</td>
            </tr>
          )) : (
            <tr>
              <td className='py-2 px-4 border border-gray-300 text-center' colSpan={2}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>) : <h2 className='text-center text-2xl py-5'>No Data Found</h2>
  );
};

export default MedicationDetails;
