import React, { useEffect, useState } from 'react';
import "./App.css";
import SignUp from "./component/SignUp/SignUp";
import Dashboard from "./component/Coordinator/Dashboard/Dashboard";
import Login from "./component/Login/Login";
import Form from './component/Coordinator/Form/Form';
import GetData from './component/Coordinator/GetData/GetData';
import Faculty from './component/Faculty/Faculty';
import AAform from './component/Admin/Acoordinator/AAform';
import AAgetdata from './component/Admin/Acoordinator/AAgetdata';
import Cform from './component/Admin/Course/Cform';
import Filter from './component/Admin/Filter';
import Course from './component/Faculty/Course';
import Announce from './component/Admin/Annoucement/Annouce';
import Announcement from './component/Admin/Annoucement/Annoucement';
import AnnouceData from './component/Admin/Annoucement/AnnouceData';
import FacultyForm from './component/Admin/FacultyForm/FacultyForm';
import Deregistration from './component/Admin/Course/Deregistration';


import { Route, Routes as Switch, BrowserRouter } from 'react-router-dom';
import { auth } from './firebase';
import Admin from './component/Admin/Admin';
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path='/' element={<Login />} />

        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/facultyform' element={<Form />} />
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/getdata' element={<GetData />} />
        <Route exact path='/faculty' element={<Faculty />} />
        <Route exact path='/aaform' element={<AAform />} />
        <Route exact path='/aagetdata' element={<AAgetdata />} />
        <Route exact path='/cform' element={<Cform />} />
        <Route exact path='/filter' element={<Filter />} />
        <Route exact path='/course' element={<Course />} />

         <Route exact path='/announce' element={<Announce />}/> 
         <Route exact path='/announcement' element={<Announcement/>}/> 
         <Route exact path='/annoucedata' element={<AnnouceData/>}/> 
        <Route exact path='/facultyform1' element={<FacultyForm/>}/> 
         
        <Route exact path='/deregistration' element={<Deregistration/>}/> 
         


      </Switch>
    </BrowserRouter>
  );
}
export default App;