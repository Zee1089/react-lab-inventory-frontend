import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

import styles from './Navbar.module.css';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li className={styles.li}>
            <Link to="/"><span className={styles.span}>Welcome, {user.username}</span></Link>
            </li>
            
            <li className={styles.li}>
              <Link to="/reagents"><span className={styles.span}>Reagents</span></Link>
            </li>
            
            <li className={styles.li}>
              <Link to="/reagents/new"><span className={styles.span}>New Reagent</span></Link>
            </li>
            
            <li className={styles.li}>
              <Link to="/equipments"><span className={styles.span}>Equipment</span></Link>
            </li>
            
            <li className={styles.li}>
              <Link to="/equipments/new"><span className={styles.span}>New Equipment</span></Link>
            </li>
            <li className={styles.li}>
              <Link to="" onClick={handleSignout}><span className={styles.span}>
                Sign Out
              </span></Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li className={styles.li}>
              <Link to="/signin"><span className={styles.span}>"Sign In</span></Link>
            </li>
            <li className={styles.li}>
              <Link to="/signup"><span className={styles.span}>"Sign Up</span></Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
