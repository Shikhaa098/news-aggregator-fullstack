import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full md:w-1/2 mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Register
      </button>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-green-600">Login here</Link>
      </p>
    </form>
  );
};

export default Register;
