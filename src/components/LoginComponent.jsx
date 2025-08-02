// src/components/LoginComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useApi } from '../context/ApiContext';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { getBaseUrl } = useApi();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${getBaseUrl()}/api/auth/login`, {
        email: email.toLowerCase(),
        password: password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem('jwtToken', token);
        console.log("Token saved:", token);
        navigate('/'); // ✅ Redirect after login
      } else {
        setError('No token received from server');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
};

export default LoginComponent;
