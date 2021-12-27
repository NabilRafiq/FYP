import React,{useState} from 'react';
import './Dashboard.module.css'
import {db,auth} from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Dashboard(){
    const history= useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
             await auth.signOut();
            history('/', { replace: true })
        } catch (err) {
            alert(err.message);
        }
    }
 

    return(
        <div className="Dashboard">
                  <Helmet>
        <title>Dashboard</title>
      </Helmet>
      
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#192841'}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown" >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" >Home</a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" >Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Pricing</a>
        </li> */}
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Faculty
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/facultyform',{replace:true})}}
                 className="dropdown-item" >
                Faculty Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Faculty Data
                </a></li>
            {/* <li><a className="dropdown-item" >Another action</a></li>
            <li><a className="dropdown-item" >Something else here</a></li> */}
          </ul>
        </li>
        <li className="nav-item">
          { <a onClick={handleLogin} style={{cursor:'pointer'}} className="nav-link active" aria-current="page" >
              Logout
          </a> 
         /*   async function handleLogout  (){
    await auth.signOut();

    history("/login",{replace:true})
  } 
          */}
        </li>
      </ul>
    </div>
  </div>
</nav>
          
            
            

            

        </div>
    )
}



