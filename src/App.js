import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent.jsx';
import FooterComponent from './components/FooterComponent.jsx';

import HomePage from './components/HomePage.jsx';
import ListImageComponent from './components/ListImageComponent.jsx';
import NoteList from './components/NoteList.js';
import UserManagementComponent from './components/UserManagementComponent.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import RegisterComponent from './components/RegisterComponent.jsx';
import PrivateRoute from './components/PrivateRoute.js';
import UserProfile from './components/UserProfile.jsx';
function App() {
  return (
    <BrowserRouter basename="/spring_boot_react_crud">
      <HeaderComponent />

      <main className="container my-4">
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

          {/* 🔒 Protected Routes */}
          <Route path="/notes" element={<PrivateRoute><NoteList /></PrivateRoute>} />
          <Route path="/images" element={<PrivateRoute><ListImageComponent /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><UserManagementComponent /></PrivateRoute>} />
		  <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        </Routes>
      </main>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
