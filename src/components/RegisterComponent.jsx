import React, { useState } from 'react';
import axios from 'axios';
import { useApi } from '../context/ApiContext';

const RegisterComponent = () => {
  const { getBaseUrl } = useApi();
  const [formData, setFormData] = useState({
    email: '', password: '', userName: '', role: 'USER'
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${getBaseUrl()}/api/auth/register`, formData);
      setMessage('Registration successful! You can now login.');
    } catch (error) {
      setMessage('Registration failed: ' + error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <input type="text" name="userName" className="form-control mb-2" placeholder="User Name" onChange={handleChange} />
      <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />
      
      <select name="role" className="form-control mb-2" onChange={handleChange} value={formData.role}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button className="btn btn-primary" onClick={handleRegister}>Register</button>
      <p className="mt-3">{message}</p>
    </div>
  );
};

export default RegisterComponent;
