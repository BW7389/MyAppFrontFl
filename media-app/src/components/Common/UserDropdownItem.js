import React from 'react';
import './UserDropdownItem.css';

const UserDropdownItem = ({ text, icon, link }) => {
  return (
    <li className="user-dropdown-item">
      {icon}
      <a href={link}>{text}</a>
    </li>
  );
};

export default UserDropdownItem;
