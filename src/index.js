// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from './context/ApiContext'; // ✅ correct import
import { AuthProvider } from './context/AuthContext'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApiProvider>
);

reportWebVitals();
