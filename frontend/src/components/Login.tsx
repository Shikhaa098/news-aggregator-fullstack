import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { FiMail, FiLock } from 'react-icons/fi';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border rounded px-3 py-2 mb-4">
            <FiMail className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border rounded px-3 py-2 mb-6">
            <FiLock className="text-gray-500 mr-2" />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
