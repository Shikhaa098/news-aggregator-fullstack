import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/news');
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) return alert("Password must be at least 6 characters.");

    try {
      await api.post('/register', form);
      toast.success('Registered successfully. Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border rounded px-3 py-2 mb-4">
            <FiUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2 mb-4">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2 mb-6">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
