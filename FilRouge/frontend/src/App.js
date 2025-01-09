// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/navigation/Signup';
import Search from './pages/redirections/Search';
import Contact from './pages/navigation/Contact';
import About from './pages/navigation/About';
import Signin from './pages/navigation/Signin'
import UserTypes from './pages/navigation/users/UserTypes';
import AuthForm from './pages/customers/AutoForm';
import ResultsofSearch from './pages/navigation/search/ResultsofSearch';
import ReservationList from './pages/reservations/ReservationList ';
import ReservationForm from './pages/reservations/ReservationForm';
import WorkspaceList from './pages/worksapace/WorkspaceList';
import Prestataire from './pages/prestataire/Prestataire';


const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/usertypes' element={<UserTypes />}/>
        <Route path="/usertypes/signin" element={<Signin />} /> 
        <Route path="/usertypes/signup" element={<Signup />} />
        <Route path='/autoform' element={<AuthForm/>}/>
        <Route path='/list-workspaces' element={<WorkspaceList />}  />
        <Route path='/results' element={<ResultsofSearch />} />
        <Route path="/reserve/:idWorkspace" element={<ReservationForm />} />
        <Route path="/reservations" element={<ReservationList />} />

        <Route path="/prestataire" element={<Prestataire />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
