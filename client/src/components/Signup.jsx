// Signup.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios"
import * as Yup from 'yup'

const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, login } = useAuthContext();

  const schema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().required().email("Invalid Email"),
    password: Yup.string().required().min(5).max(16),
    confirmPassword: Yup.string().required().min(5).max(16),
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(form, { abortEarly: false })
      try {
        setLoading(true);
        setError(null);
        if (form.password !== form.confirmPassword) {
          console.log(form)
          setError({ match: 'Passwords do not match!' });
          return;
        }
        const response = await axios.post('/register', {
          fname: form.firstname,
          lname: form.lastname,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        });
        if(response.data.success){
          navigate('/login');
        }
        else{
          setError({ message: response?.data?.message});
        }
      } catch (err) {
        console.log(err)
        setError({ message: err.response?.data?.message || 'Registration failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    } catch (validationError) {
      let formatErrors = {};
      validationError.inner.forEach((err) => {
        formatErrors[err.path] = err.message
      })
      if (form.password !== form.confirmPassword) {
        console.log(form)
        formatErrors["match"] = 'Passwords do not match!';
      }
      setError(formatErrors);
    }

  };


  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate('/');
    }
  }, [loading, isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
             <p className="text-xs pt-2 h-3 text-[red]">{error?.firstname && "*"+error.firstname}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
             <p className="text-xs pt-2 h-3 text-[red]">{error?.lastname && "*"+error.lastname}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
             <p className="text-xs pt-2 h-3 text-[red]">{error?.email && "*"+error.email}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
             <p className="text-xs pt-2 h-3 text-[red]">{error?.password && "*"+error.password}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
             <p className="text-xs pt-2 h-3 text-[red]">{error?.confirmPassword ? "*"+error.confirmPassword : error?.match ? "*"+error.match : ""}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Signup
          </button>
          <p className="text-md text-center pt-2 h-3 text-[red]">{error?.message && error.message}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
