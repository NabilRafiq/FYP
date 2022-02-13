import React, { useState, useEffect } from 'react';
import './Admin.css'
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Dashboard() {

  useEffect(() => {
    // change background color with a random color
    const color = "#f0f2f0";
    document.body.style.background = color;
  });



  const history = useNavigate()
  const [info, setInfo] = useState([]);
  const [disable, setDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await firebase.auth.signOut();
      history('/', { replace: true })
    } catch (err) {
      alert(err.message);
    }
  }
  const userInformation = async (e) => {

    const user = firebase.auth.currentUser;

    setDisable(true);
    setLoading(true);
    try {

      await firebase.db.collection("programmanager").where("email", "==", user.email).get()
        .then(querySnapshot => {

          querySnapshot.forEach(element => {
            var data = element.data();
            setInfo(arr => [...arr, data]);



          })
          setLoading(false);
        });



    } catch (err) {
      alert(err.message);
    }

  }


  return (
    <div className="ada_container">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#192841' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" >Home</a>
              </li>


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Faculty
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/facultyform', { replace: true })
                  }}
                    className="dropdown-item" >
                    Faculty Form
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/getdata', { replace: true })
                  }}
                    className="dropdown-item" >
                    Faculty Data
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/search', { replace: true })
                  }}
                    className="dropdown-item" >
                    Search Faculty
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/filter', { replace: true })
                  }}
                    className="dropdown-item" >
                    Filter Faculty Data
                  </a></li>

                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Coordinator
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/aaform', { replace: true })
                  }}
                    className="dropdown-item" >
                    Coordinator Form
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/aagetdata', { replace: true })
                  }}
                    className="dropdown-item" >
                    Coordinator Data
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/acsearch', { replace: true })
                  }}
                    className="dropdown-item" >
                    Search Coordinator
                  </a></li>



                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Course
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/cform', { replace: true })
                  }}
                    className="dropdown-item" >
                    Course Form
                  </a></li>

                </ul>
              </li>
              {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa fa-bullhorn" style={{fontSize:"large",color:"white"}} aria-hidden="true"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/facultyform',{replace:true})}}
                 className="dropdown-item" >
                Annoucement Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Annoucement Data
                </a></li>
      
          </ul>
        </li> */}

              <li className="nav-item">
                <a onClick={handleLogin} style={{ cursor: 'pointer' }} className="nav-link active" aria-current="page" >
                  Logout
                </a>


              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="ad_container container" >

        <h3 style={{ textAlign: "center", margin: '50px' }}>User's Information</h3>

        <button disabled={disable} className='fa_button btn d-grid gap-2 col-6 mx-auto' type='button' onClick={() => { userInformation() }}>Show Information</button>
        {
          (() => {
            if (loading) {
              return (
                <div class="text-center" style={{ margin: "10px" }}>
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div></div>
              )
            }
          })()
        }

     
                     {


          info.map((data) => (
            <div className="d-flex justify-content-center">
        <table className="table" id="getData" style={{marginTop:"25px"}}> 
          <tbody>
            <tr>
              <th>Name</th>
            <td> {data.name} </td>
            </tr>
            <tr>
              <th>Email</th>
            <td> {data.email} </td>
            </tr>
            <tr>
              <th>Program</th>
            <td> {data.program} </td>
            </tr>
            <tr>
              <th>Role</th>
            <td> {data.role} </td>
            </tr>
          </tbody>
        </table></div>

            
            ))}

 
            


      </div>



    </div>
  )
}



