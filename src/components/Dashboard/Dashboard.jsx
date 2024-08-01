import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Have you put on your PPE?
        <br />
        Remember: The best protection is prevention.
      </p>
    </main>
  );
};

export default Dashboard;
