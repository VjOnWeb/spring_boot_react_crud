// Import necessary modules
import React from 'react';
import { Link } from 'react-router-dom';

// Define the Home Page component
const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the home page of our application.</p>

      <p>
        You can explore the following pages:</p>
        <ul>
          <li>
            <strong>Images Page:</strong> View and manage images.
            <Link to="/images"> Go to Images</Link>
          </li>
          <li>
            <strong>Users Page:</strong> View and manage users.
            <Link to="/users"> Go to Users</Link>
          </li>
        </ul>
  
    </div>
  );
};

// Export the Home Page component
export default HomePage;
