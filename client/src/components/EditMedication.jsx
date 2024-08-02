import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditMedication = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: '',
    startDate: '',
    endDate: '',
    time: '',
    frequency: '',
    dayOfWeek: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedication = async () => {
      try {
        const response = await axios.get(`/medication/${id}`);
        const data = response.data.medications
        setForm({
          name: data.name || '',
          description: data.description || '',
          type: data.type || '',
          startDate: data.start_date || '',
          endDate: data.end_date || '',
          time: data.time || '',
          frequency: data.frequency || '',
          dayOfWeek: data.day_of_week || '',
        });
      } catch (error) {
        console.error('Error fetching medication:', error);
      }
    };

    fetchMedication();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/medication/${id}`, form);
      navigate('/');
    } catch (error) {
      console.error('Error updating medication:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Medication</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Type</option>
            <option value="one-time">One Time</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {form.type === 'recurring' && (
          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {form.type === 'recurring' && (
          <div className="mb-4">
            <label className="block text-gray-700">Frequency</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        )}
        {form.frequency === 'weekly' && (
          <div className="mb-4">
            <label className="block text-gray-700">Day of the Week</label>
            <select
              name="dayOfWeek"
              value={form.dayOfWeek}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Day</option>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditMedication;
