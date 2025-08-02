import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../axiosWithAuth';
import { useAuth } from '../context/AuthContext';
import { useApi } from '../context/ApiContext';

const UserProfile = () => {
  const { user, updateUserInContext } = useAuth();
  const { getBaseUrl } = useApi();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosWithAuth.put(`${getBaseUrl()}/api/users/update-profile`, formData);
      updateUserInContext(res.data); // ✅ update context with latest data
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Update failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      {message && <p className="text-info">{message}</p>}

      <input
        type="text"
        name="username"
        placeholder="Name"
        value={formData.username}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="New Password"
        value={formData.password}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <button onClick={handleSubmit} className="btn btn-primary">Update</button>
    </div>
  );
};

export default UserProfile;
