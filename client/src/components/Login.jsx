// Login.js
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid Email"),
    password: Yup.string().required("Password required").min(5).max(16),
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await schema.validate(form, { abortEarly: false })

      try {
        const response = await axios.post('/login', {
          email: form.email,
          password: form.password
        });
        console.log(response)
        login()
        console.log('Login successful');
      } catch (error) {
        setError({message:error.response?.data?.message || 'Login failed. Please try again.'});
      } finally {
        setLoading(false);
      }
    } catch (validationError) {
      let formatErrors = {};
      validationError.inner.forEach((err) => {
        formatErrors[err.path] = err.message
      })
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
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <p className="text-md pt-2 h-3 text-[red] text-center">{error?.message && error.message}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
