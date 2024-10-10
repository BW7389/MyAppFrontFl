import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserDropdownItem from '../../../Common/UserDropdownItem';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleDropdown = () => setShowUserDropdown(!showUserDropdown);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-title-link">
          <h1 className="header-title">K-Pop Dashboard</h1>
        </Link>
        <nav className="header-nav">
          <ul>
            <li><Link to="/videos">Videos</Link></li> 
            <li><Link to="/gallery">Gallery</Link></li> 
            <li><Link to="/news">News</Link></li>
          </ul>
        </nav>
        <div className="user-menu" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUserCircle} size="lg" className="icon" />
          {showUserDropdown && (
            <ul className="user-dropdown">
              <UserDropdownItem
                text="Profile"
                icon={<FontAwesomeIcon icon={faUserCircle} size="lg" />}
                link="/profile"
              />
              <UserDropdownItem
                text="Logout"
                icon={<FontAwesomeIcon icon={faSignOutAlt} size="lg" />}
                link="/logout" 
              />
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
