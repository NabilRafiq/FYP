import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import * as firebase from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Dashboard() {




  const history = useNavigate()
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = React.useState(null);


  useEffect(() => {
    // Update the document title using the browser API
    setLoading(true);
    firebase.auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })
    userInformation();
  }, []);


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


    try {
      setLoading(true);

      await firebase.db.collection("coordinator").where("email", "==", user.email).get()
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
    <div className="Dashboard" >
      <Helmet>
        <title>Coordinator Dashboard</title>
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
                    history('/filter', { replace: true })
                  }}
                    className="dropdown-item" >
                    Filter Faculty Data
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
                    Create a Course
                  </a></li>



                </ul> 
              </li>
              <li className="nav-item">
              <a className="nav-link active" style={{ cursor: 'pointer' }} onClick={() => {
                  history('/announcement', { replace: true })
                }} Annoucement role="button" aria-expanded="false">
                  Annoucement
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={handleLogin}
                  style={{ cursor: "pointer" }}
                  className="nav-link active"
                  aria-current="page"
                  id="logout"
                >
                  Logout

                  <i class="fa-solid fa-right-from-bracket ms-3" ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="container da_container"   >

        <h3 style={{ textAlign: "center", margin: '30px' }}>User's Information</h3>



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
        <div className="row">


          {


            info.map((data) => (
              <div className="d-flex justify-content-center">
                <table className="table" id="getData" style={{ marginTop: "25px" }}>
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
                      <th>Age</th>
                      <td> {data.age} </td>
                    </tr>
                    <tr>
                      <th>Field</th>
                      <td> {data.field} </td>
                    </tr>
                    <tr>
                      <th>Qualification</th>
                      <td> {data.qualification} </td>
                    </tr>

                    <tr>
                      <th>Role</th>
                      <td> {data.role} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>


      </div>



    </div>
  )
}



