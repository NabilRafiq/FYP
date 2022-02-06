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
import Ccouse from './component/Coordinator/Ccourse/Ccourse';
import Search from './component/Admin/Search';
import Acsearch from './component/Admin/Acoordinator/Acsearch';
// import Announce from './component/Annoucement/Annouce';

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
        <Route exact path='/ccourse' element={<Ccouse />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/acsearch' element={<Acsearch />} />
        {/* <Route exact path='/announce' element={<Announce />}/> */}



      </Switch>
    </BrowserRouter>
  );
}
export default App;