import React,{useEffect, useState} from 'react';
import "./App.css";
import SignUp from "./component/SignUp/SignUp";
import Dashboard from "./component/Dashboard/Dashboard";
import Login from "./component/Login/Login";
import Form from './component/Form';
import GetData from './component/GetData';

import {Route, Routes as Switch, BrowserRouter} from 'react-router-dom';
import {auth} from './firebase';
import Admin from './component/Admin/Admin';
function App() {
  const [user,setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])
  
  return (
 <BrowserRouter>
 <Switch>

            <Route exact path='/' element={<Login/>}/>

          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/dashboard' element={<Dashboard />}/>
          <Route exact path='/facultyform' element={<Form />}/>
          <Route exact path='/admin' element={<Admin />}/>
          <Route exact path='/getdata' element={<GetData />}/>
        

 </Switch>
 </BrowserRouter>
  );
}
export default App;