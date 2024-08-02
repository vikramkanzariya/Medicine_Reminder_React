import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

const AddMedication = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "one-time",
    startDate: "",
    endDate: "",
    time: "",
    frequency: "daily",
    dayOfWeek: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required(),
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
    time: Yup.string().required(),
    frequency: Yup.string().when("type", {
      is: "recurring",
      then: (schema) => schema.required()
    }),
    dayOfWeek: Yup.string().when("frequency", {
      is: "weekly",
      then: (schema) => schema.required()
    }),
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.type === "one-time") {
        form.endDate = form.startDate
      }
      console.log(form)
      await schema.validate(form, { abortEarly: false })
      try {
        const response = await axios.post("/medication/add", form);
        console.log(response);
        if (response.data.success) {
          alert("added successfully");
          navigate("/")
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error adding medication:", error);
      }
    } catch (validationError) {

      let formatErrors = {};
      validationError.inner.forEach((err) => {
        console.log(err.message)
        formatErrors[err.path] = err.message
      })
      setError(formatErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Add Medication</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {error?.name && <p className="text-xs pt-2 text-[red]">*{error.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {error?.description && <p className="text-xs pt-2 text-[red]">*{error.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="one-time">One Time</option>
          <option value="recurring">Recurring</option>
        </select>
        {error?.type && <p className="text-xs pt-2 text-[red]">*{error.type}</p>}
      </div>

      {form.type === "one-time" && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            min={new Date().toISOString().substring(0, 10)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error?.startDate && <p className="text-xs pt-2 text-[red]">*{error.startDate}</p>}
        </div>
      )}

      {form.type === "recurring" && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              min={new Date().toISOString().substring(0, 10)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
             {error?.startDate && <p className="text-xs pt-2 text-[red]">*{error.startDate}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
             {error?.endDate && <p className="text-xs pt-2 text-[red]">*{error.endDate}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Frequency</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            {error?.frequency && <p className="text-xs pt-2 text-[red]">*{error.frequency}</p>}
          </div>

          {form.frequency === "weekly" && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Day of the Week
              </label>
              <select
                name="dayOfWeek"
                value={form.dayOfWeek}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
              {error?.dayOfWeek && <p className="text-xs pt-2 text-[red]">*{error.dayOfWeek}</p>}
            </div>
          )}
        </>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Time</label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
         {error?.time && <p className="text-xs pt-2 text-[red]">*{error.time}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddMedication;
