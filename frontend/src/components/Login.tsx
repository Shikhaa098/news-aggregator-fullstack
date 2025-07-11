import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/news');
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return alert("Password must be at least 6 characters.");

    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/news');
      }, 1000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full md:w-1/2 mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Login
      </button>
      <p className="text-center mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600">Register here</Link>
      </p>
    </form>
  );
};

export default Login;
