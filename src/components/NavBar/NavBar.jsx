import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
            <Link to="/">Welcome, {user.username}</Link>
            </li>
            <li>
              <Link to="/reagents">Reagents</Link>
            </li>
            <li>
              <Link to="/reagents/new">New Reagent</Link>
            </li>
            <li>
              <Link to="/equipments">Equipment</Link>
            </li>
            <li>
              <Link to="/equipments/new">New Equipment</Link>
            </li>
            {/* <li>
              <Link to="/">Dashboard</Link>
            </li> */}
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
