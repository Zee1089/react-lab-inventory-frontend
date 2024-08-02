import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import reagentLogo from './assets/reagents.svg'
import equipmentLogo from './assets/equipment.svg'
import './Dashboard.css'

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
    <div>
    <NavLink to="/reagents" className={({ isActive }) => (isActive ? 'active' : '')}>
        <img src={reagentLogo} className="logo reagent" alt="Reagent logo" />
    </NavLink>
    </div>
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
    </>
  );
};

export default Dashboard;
