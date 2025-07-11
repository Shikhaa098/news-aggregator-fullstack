import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import NewsFeed from './components/NewsFeed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, [location]); // Re-run whenever location changes (after login/register/logout)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/news" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/news" />} />
        <Route path="/news" element={token ? <NewsFeed /> : <Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
