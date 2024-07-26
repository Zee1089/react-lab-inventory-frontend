import { useState, createContext, useEffect } from 'react'; // added useEffect import
import { Routes, Route, useNavigate } from 'react-router-dom'; // added useNavigate import

//___Components___//
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import ReagentList from './components/ReagentList/ReagentList';
import ReagentDetails from './components/ReagentDetails/ReagentDetails';
import ReagentForm from './components/ReagentForm/ReagentForm';

//___Services___//
import * as authService from '../src/services/authService'; // import the authservice
import * as reagentService from '../src/services/reagentService'; // created and imported reagentService for back-end requests

export const AuthedUserContext = createContext(null);

const App = () => {

  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [reagents, setReagents] = useState([]); // created reagents state

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const navigate = useNavigate(); // assigned useNavigate() function to variable 'navigate'

  useEffect(() => {
    const fetchAllReagents = async () => {
      const reagentsData = await reagentService.index();
      // console.log('reagentsData:', reagentsData);
      // Set state:
      setReagents(reagentsData);
    };
    if (user) fetchAllReagents();
  }, [user]);

  const handleAddReagent = async (reagentFormData) => {
    const newReagent = await reagentService.create(reagentFormData);
    setReagents([newReagent, ...reagents]);
    // add new value to front of the array to display newest entry at the top
    navigate('/reagents');
  };
  const handleDeleteReagent = async (reagentId) => {
    const deletedReagent = await reagentService.deleteReagent(reagentId);
    setReagents(reagents.filter((reagent) => reagent._id !== deletedReagent._id));
    navigate('/reagents');
  };


  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/reagents" element={<ReagentList reagents={reagents} />} />
              <Route path="/reagents/new" element={<ReagentForm handleAddReagent={handleAddReagent} />} />
              <Route
                path="/reagents/:reagentId"
                element={<ReagentDetails handleDeleteReagent={handleDeleteReagent} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path="/*" element={<><h1>Nothing here</h1></>} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
