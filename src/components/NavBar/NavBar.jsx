import { Link, NavLink } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav>
      <div className="title">
        <span>LabStocker </span>
      </div>
      <div className="menu" onClick={toggleMenu}>
        <span></span>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        {user ? (
          <>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Welcome, {user.username}
              </NavLink>
            </li>
            <li>
              <NavLink to="/reagents" className={({ isActive }) => (isActive ? 'active' : '')}>
                Reagents
              </NavLink>
            </li>
            <li>
              <NavLink to="/reagents/new" className={({ isActive }) => (isActive ? 'active' : '')}>
                New Reagent
              </NavLink>
            </li>
            <li>
              <NavLink to="/equipments">Equipment</NavLink>
            </li>
            <li>
              <NavLink to="/equipments/new">New Equipment</NavLink>
            </li>
            <li>
              <NavLink to="" onClick={handleSignout} className={({ isActive }) => (isActive ? 'active' : '')}>
                Sign Out
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/signin" className={({ isActive }) => (isActive ? 'active' : '')}>
                <FontAwesomeIcon icon={faRightToBracket} /> Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
