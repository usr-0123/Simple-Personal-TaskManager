import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar.scss'

const Sidebar = () => {
  return (
    <nav>
      <ul className='sidebarLists'>
        <li className='sidebarLink'>
          <Link to="/">Home</Link>
        </li>
        <li className='sidebarLink'>
          <Link to="/new">New Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
