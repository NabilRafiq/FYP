import React, { useState, useEffect } from 'react';
import './Faculty.css';
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Faculty() {


  useEffect(() => {
    // change background color with a random color
    setLoading(true);
    userInformation();
  },[]);

  const getInitialState = () => {
    const value = "8:00am-10:30am";
    return value;
  };
  const history = useNavigate()
  const [info, setInfo] = useState([]);
  const [disable, setDisable] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(getInitialState);
  const [day, setDay] = useState(false);
  const [day1, setDay1] = useState(false);
  const [day2, setDay2] = useState(false);
  const [day3, setDay3] = useState(false);
  const [day4, setDay4] = useState(false);
  const [day5, setDay5] = useState(false);


  let docid = "1";
  let docid1 = "1";





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

    try {
      setLoading(true);

      await firebase.db.collection("facultyform").where("email", "==", user.email).get()
        .then(querySnapshot => {

          querySnapshot.forEach(element => {

            var data = element.data();
            setInfo(arr => [...arr, data]);



          })

          console.log(docid)
          setLoading(false);

        });



    } catch (err) {
      alert(err.message);
    }

  }

  const handleSubmit = async (e) => {

    const user = firebase.auth.currentUser;
    await firebase.db.collection("facultyform").where("email", "==", user.email).get()
      .then(querySnapshot => {

        querySnapshot.forEach(element => {
          docid = element.id;


        })




      });
    await firebase.db.collection("users").where("email", "==", user.email).get()
      .then(querySnapshot => {

        querySnapshot.forEach(element => {
          docid1 = element.id;


        })



      });


    var washingtonRef = firebase.db.collection("facultyform").doc(docid);
    var washingtonRef1 = firebase.db.collection("users").doc(docid1);


    await washingtonRef.update({
      timeslot: time,
      day: day + " " + day1 + " " + day2 + " " + day3 + " " + day4 + " " + day5,
    })
    return washingtonRef1.update({
      timeslot: time,
      day: day + " " + day1 + " " + day2 + " " + day3 + " " + day4 + " " + day5,
    })

      .then(function () {
        alert("Data updated successfully")
        setTimeout(function () { window.location.reload() }, 1500);
      })
      .catch(function (error) {
        alert(error.message)
        setTimeout(function () { window.location.reload() }, 1500);
      })




  }


  return (
    <div className="Dashboard" >
      <Helmet>
        <title>Faculty Dashboard</title>
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

              {/* <li className="nav-item dropdown">
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
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/search',{replace:true})}}
                 className="dropdown-item" >
                Search Faculty
                </a></li>

          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Course
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/ccourse',{replace:true})}}
                 className="dropdown-item" >
                Course Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Faculty Data
                </a></li>
             

          </ul>
        </li> */}
              <li className="nav-item">
                {<a onClick={handleLogin} style={{ cursor: 'pointer' }} className="nav-link active" aria-current="page" >
                  Logout
                </a>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="container fa_container"   >

        <h3 style={{ textAlign: "center", margin: '30px' }}>User's Information</h3>

        
        {
          (() => {
            if (loading) {
              return (
                <div className="text-center" style={{ margin: "10px" }}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div></div>
              )
            }
          })()
        }
        <div className="row">


          {


            info.map((data) => (
              <div className='d-flex justify-content-center'>
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
                      <th>Program</th>
                      <td> {data.program} </td>
                    </tr>
                    <tr>
                      <th>Role</th>
                      <td> {data.role} </td>
                    </tr>
                    <tr>
                      <th><label htmlFor="role" className='f_label form-label' ><b>Timeslot</b></label></th>

                      <td>  <br /><div className="form-switch">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => setDay(e.target.checked)} id="inlineCheckbox1" value="monday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox1">Monday</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => setDay1(e.target.checked)} id="inlineCheckbox2" value="tuesday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox2">Tuesday</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => setDay2(e.target.checked)} id="inlineCheckbox3" value="wednesday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Wednesday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={(e) => setDay3(e.target.checked)} value="thursday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Thursday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => setDay4(e.target.checked)} id="inlineCheckbox3" value="friday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Friday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={(e) => setDay5(e.target.checked)} value="saturday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Saturday </label>
                        </div></div>


                        <br /><br />

                        <div className="input-group mb-3">
                          <label className="input-group-text" htmlFor="inputGroupSelect01"><i className="bi bi-alarm-fill" style={{ fontSize: "large" }}></i></label>
                          <select onChange={(e) => setTime(e.target.value)} value={time} className="form-select" id="inputGroupSelect01">
                            <option value="8am-10:30am">8am-10:30am</option>
                            <option value="11am-1:30pm">11am-1:30pm</option>
                            <option value="1:45pm-4:15pm">1:45pm-4:15pm</option>
                            <option value="4:30pm-7:00pm">4:30pm-7:00pm</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>


              </div>
            ))}
          {
            (() => {
              if (disable && !loading) {
                return (
                  <div className="d-flex justify-content-center">
                    <button className='fa_button' onClick={(e) => { handleSubmit(e) }}>Update</button></div>
                )
              }
            })()
          }

        </div>


      </div>



    </div>
  )
}



