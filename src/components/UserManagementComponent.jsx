import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { deleteUser, listUser, saveUser, updateUser } from '../services/userService';
import jsonData from './data/users.json'; // Import JSON data

const UserManagementComponent = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    occupation: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    occupation: ''
  });
  const [useJsonData, setUseJsonData] = useState(false); // Boolean flag to switch between API and JSON data
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  useEffect(() => {
    // Fetch the list of users on component mount
    refreshUserList();
     // Show the popup message for 3 seconds
     setTimeout(() => {
      setShowPopup(false);
    }, 6000);
  }, []);

  const refreshUserList = () => {
    if (useJsonData) {
      setUsers(jsonData.users); // Use JSON data
    } else {
      listUser()
        .then(response => {
          setUsers(response.data); // Use API data
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // Clear validation error when user starts typing
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate each field
    for (const key in formData) {
      const value = formData[key];

      if (typeof value === 'string' && value.trim() === '') {
        errors[key] = 'This field is required';
        isValid = false;
      } else {
        errors[key] = ''; // Clear the error if the field is not empty or not a string
      }
    }
    setValidationErrors(errors);
    return isValid;
  };

  const handleSaveUser = () => {
    if (validateForm()) {
      saveUser(formData)
        .then(() => {
          // Refresh the user list after saving
          refreshUserList();
          // Clear the form data
          setFormData({
            firstName: '',
            lastName: '',
            age: '',
            occupation: ''
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleUpdateUser = id => {
    updateUser(id, formData)
      .then(() => {
        // Refresh the user list after updating
        refreshUserList();
        // Clear the form data
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          occupation: ''
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteUser = id => {
    deleteUser(id)
      .then(() => {
        // Refresh the user list after deletion
        refreshUserList();
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div className='container'>
      <Helmet>
        <title>User Management APP</title>
      </Helmet>
      <h2 className='text-center'>List of Users</h2>

      {/* Form for adding or updating a user */}
      <form>
        {/* Form inputs */}
        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${validationErrors.firstName && 'is-invalid'}`}
            name='firstName'
            value={formData.firstName}
            placeholder='First Name'
            onChange={handleInputChange}
            required
          />
          <div className='invalid-feedback'>{validationErrors.firstName}</div>
        </div>

        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${validationErrors.lastName && 'is-invalid'}`}
            name='lastName'
            value={formData.lastName}
            placeholder='Last Name'
            onChange={handleInputChange}
            required
          />
          <div className='invalid-feedback'>{validationErrors.lastName}</div>
        </div>

        <div className='mb-3'>
          <input
            type='number'
            className={`form-control ${validationErrors.age && 'is-invalid'}`}
            name='age'
            value={formData.age}
            placeholder='Age'
            onChange={handleInputChange}
            required
          />
          <div className='invalid-feedback'>{validationErrors.age}</div>
        </div>

        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${validationErrors.occupation && 'is-invalid'}`}
            name='occupation'
            value={formData.occupation}
            placeholder='Occupation'
            onChange={handleInputChange}
            required
          />
          <div className='invalid-feedback'>{validationErrors.occupation}</div>
        </div>

        {/* Save button */}
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleSaveUser}
        >
          Save User
        </button>
      </form>

     {/* Popup message */}
      {showPopup && (
        <div className='popup draggable'>
          <div className='popup-content'>
            <span className='close-icon' onClick={() => setShowPopup(false)}>&times;</span>
            <h1 className='popup-title'>Important Message</h1>
            <p className='popup-text'>
              Welcome!<br />
              Due to deployment constraints, I'm using JSON-based data just for viewing.<br />
              Rest API codes are available on GitHub.
            </p>
          </div>
        </div>
      )}
       {/* Toggle button to switch between API and JSON data */}
      {useJsonData && (
        <div className='form-check form-switch text-center position-relative'>
          <input
            className='form-check-input read-only'
            type='checkbox'
            id='flexSwitchCheckDefault'
            checked={useJsonData}
            onChange={() => setUseJsonData(prevState => !prevState)}
            disabled
          />
          <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
            This Table is Using JSON Data
          </label>
         
          {/* Info icon */}
          <span className='info-icon' onClick={() => setShowPopup(true)}>
            <i className='fas fa-info-circle'></i>
          </span>
        </div>
 )}
      {/* User list table */}
      <table className='table table-striped table-bordered mt-4'>
        <thead className='table-dark'>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Occupation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.occupation}</td>
              <td>
                {/* Update button */}
                <button
                  type='button'
                  className='btn btn-warning me-2'
                  onClick={() => setFormData({ ...user })}
                >
                  Update
                </button>
                {/* Delete button */}
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
};

export default UserManagementComponent;

