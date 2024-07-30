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
import CommentForm from './components/CommentForm/CommentForm';

//___Services___//
import * as authService from '../src/services/authService'; // import the authservice
import * as reagentService from '../src/services/reagentService'; // created and imported reagentService for back-end requests

import './App.css';

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
      setReagents(reagentsData);
    };
    if (user) fetchAllReagents();
  }, [user]);

  const handleAddReagent = async (reagentFormData) => {
    const newReagent = await reagentService.create(reagentFormData);
    setReagents([newReagent, ...reagents]);
    navigate('/reagents');
  };
  const handleDeleteReagent = async (reagentId) => {
    const deletedReagent = await reagentService.deleteReagent(reagentId);
    setReagents(reagents.filter((reagent) => reagent._id !== deletedReagent._id));
    navigate('/reagents');
  };
  const handleUpdateReagent = async (reagentId, reagentFormData) => {
    const updatedReagent = await reagentService.updateReagent(reagentId, reagentFormData);
    setReagents(reagents.map((reagent) => (reagentId === reagent._id ? updatedReagent : reagent)));
    navigate(`/reagents/${reagentId}`);
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
              <Route
                path="/reagents/:reagentId/edit"
                element={<ReagentForm handleUpdateReagent={handleUpdateReagent} />}
              />
              <Route
                path="/reagents/:reagentId/comments/:commentId/edit"
                element={<CommentForm />}
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
