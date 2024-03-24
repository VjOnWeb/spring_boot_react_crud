import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-dark bg-dark'>
          <a className='navbar-brand' href='/spring_boot_react_crud/'>
            <FontAwesomeIcon icon={faHome} size="2x" className="me-3 text-primary" />
            User Management System
          </a>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
