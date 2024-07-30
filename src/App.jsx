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
// import EquipmentList from './components/EquipmentList/EquipmentList';
// import EquipmentForm from './components/EquipmentForm/EquipmentForm';
// import EquipmentDetails from './components/EquipmentDetails/EquipmentDetails';

//___Services___//
import * as authService from '../src/services/authService'; // import the authservice
import * as reagentService from '../src/services/reagentService'; // created and imported reagentService for back-end requests

export const AuthedUserContext = createContext(null);

const App = () => {

  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [reagents, setReagents] = useState([]); // created reagents state
  // const [equipment, setEquipment] = useState([]); // created equipment state

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


    // Equipment related functions, need to verify naming convention due to grammatical difference in plurals
//_________________________________\\
  // useEffect(() => {
  //   const fetchAllEquipment = async () => {
  //     const equipmentData = await equipmentService.index();
  //     setEquipment(equipmentData);
  //   };
  //   if (user) fetchAllEquipment();
  // }, [user]);
  // const handleAddEquipment = async (equipmentFormData) => {
  //   const newEquipment = await equipmentService.create(equipmentFormData);
  //   setEquipment([newReagent, ...equipment]);
  //   navigate('/equipment');
  // };
  // const handleDeleteEquipment = async (reagentId) => {
  //   const deletedEquipment = await equipmentService.deleteEquipment(reagentId);
  //   setEquipment(equipment.filter((reagent) => reagent._id !== deletedEquipment._id));
  //   navigate('/equipment');
  // };
  // const handleUpdateEquipment = async (reagentId, equipmentFormData) => {
  //   const updatedEquipment = await equipmentService.updateEquipment(reagentId, equipmentFormData);
  //   setEquipment(equipment.map((reagent) => (reagentId === reagent._id ? updatedEquipment : reagent)));
  //   navigate(`/equipment/${reagentId}`);
  // };


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
              {/* <Route path="/equipment" element={<EquipmenttList equipment={equipment} />} />
              <Route path="/equipment/new" element={<EquipmentForm handleAddEquipment={handleAddEquipment} />} />
              <Route
                path="/equipment/:equipmentId"
                element={<EquipmentDetails handleDeleteEquipment={handleDeleteEquipment} />}
              />
              <Route
                path="/equipment/:equipmentId/edit"
                element={<EquipmentForm handleUpdateEquipment={handleUpdateEquipment} />}
              /> */}
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
