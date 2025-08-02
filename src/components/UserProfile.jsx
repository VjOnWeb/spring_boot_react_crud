// src/components/UserProfile.jsx
// 
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import axiosWithAuth from "../axiosWithAuth";
import { useApi } from "../context/ApiContext";

const UserProfile = () => {
  const { user, updateUserInContext } = useAuth();
  const { getBaseUrl } = useApi();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load profile from backend in case token changed
    const fetchProfile = async () => {
      try {
        const res = await axiosWithAuth.get(`${getBaseUrl()}/api/auth/me`);
        const { username, email, role } = res.data;
        setFormData({ username, email, password: '', role });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setMessage("Failed to load profile");
      }
    };

    fetchProfile();
  }, [getBaseUrl]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      const { username, email, password } = formData;
      const updateData = { username, email };
      if (password.trim() !== "") updateData.password = password;

      const res = await axiosWithAuth.put(`${getBaseUrl()}/api/auth/users/update-profile`, formData);


      updateUserInContext(res.data); // Update context
      setMessage("✅ Profile updated successfully");
      setFormData(prev => ({ ...prev, password: "" })); // Clear password field
    } catch (err) {
      console.error(err);
      setMessage("❌ Update failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <label>Name:</label>
        <input
          name="username"
          className="form-control"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email:</label>
        <input
          name="email"
          type="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Role:</label>
        <input
          name="role"
          className="form-control"
          value={formData.role}
          readOnly
        />
      </div>

      <div className="mb-3">
        <label>New Password (optional):</label>
        <input
          name="password"
          type="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          placeholder="Leave blank to keep current password"
        />
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>Update Profile</button>
    </div>
  );
};

export default UserProfile;
