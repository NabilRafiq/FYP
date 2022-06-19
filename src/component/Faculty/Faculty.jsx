import React, { useState, useEffect } from 'react';
import './Faculty.css'
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { Button, Modal } from 'react-bootstrap';
export default function Faculty() {
  
  
  const getInitialState = () => {
    const value = "8:00am-10:30am";
    return value;
  };
  const history = useNavigate()
  const [info, setInfo] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(getInitialState);
  const [model, setModel] = useState(false);
  const [reason, setReason] = useState("");
  const [course, setCourse] = useState("");
  const [user, setUser] = React.useState(null);




  useEffect(() => {
    // change background color with a random color
    setLoading(true);
    if (user) setUser(user)
    else setUser(null)
    userInformation1();
  }, []);

 
const userInformation1 = async (e) => {
  await firebase.db.collection("facultyform").get()
        .then(querySnapshot => {

          querySnapshot.forEach(element => {

            var data = element.data();
            console.log(user)

          })})
  userInformation();
}


  const [state, setState] = useState({
    days:
      [
        {
          id: 1,
          mon: false
        },
        {
          id: 2,
          tues: false
        },
        {
          id: 3,

          wed: false
        },
        {
          id: 4,

          thur: false
        },
        {
          id: 5,

          fri: false
        },
        {
          id: 6,

          sat: false
        },

      ]
  })


  let docid = "1";
  let docid1 = "1";


  const handleClose = () => setModel(false);
  const handleCourse = (data) => {
    if (reason != "" && course != "") {
      const faculty = data.name;
      const field = data.field;
      const email = data.email
      console.log(data)
      firebase.db.collection('deregistration').add({
        course: course,
        faculty: faculty,
        email: email,
        reason: reason,
        field: field,
        approval: "pending"
      })
        .then(() => {
          alert("Request made succuessfully")
        })
        .catch((error) => {
          alert(error.message);
        })
      setReason("");
    }
    else if (course == "") {
      alert('Course Doesnot Exist')
    }
    else {
      alert('Please fill out the necessary details')
    }
  }

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
      day: state.days

    })
    return washingtonRef1.update({
      timeslot: time,
      day: state.days
    })

      .then(function () {
        alert("Data updated successfully")


      })
      .catch(function (error) {
        alert(error.message)

      })




  }
  const handleday = async (day1) => {
    let updatedList = state.days.map(item => {
      if (item.id == day1) {
        return { ...item, done: !item.done }; //gets everything that was already in item, and updates "done"
      }
      return item; // else return unmodified item 
    });

    setState({ days: updatedList }); // set state to new object with updated list
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

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Course
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/course', { replace: true })
                  }}
                    className="dropdown-item" >
                    Course Registration
                  </a></li>
                  <li><a style={{ cursor: 'pointer' }} onClick={() => {
                    history('/courserequest', { replace: true })
                  }}
                    className="dropdown-item" >
                    Course Requests
                  </a></li>
                  {/* <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Faculty Data
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/search',{replace:true})}}
                 className="dropdown-item" >
                Search Faculty
                </a></li> */}

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
                    <tr>
                      <th>Date of Birth</th>
                      <td> {data.age} </td>
                    </tr>
                    <tr>
                      <th>Course 1</th>
                      <td> {data.course1} <button className="btn btn-danger" onClick={() => { setModel(true); setCourse(data.course1) }}><i class="bi bi-slash-circle"></i></button>
                        <Modal
                          show={model}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Deregister Course</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form className='faform'   style={{boxShadow:"none!important"}}>

                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Reason for Deregistration</label>
                                <textarea required class="form-control" id="exampleFormControlTextarea1" onChange={(e) => setReason(e.target.value)} rows="3"></textarea>
                              </div>


                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <button className="btn btn-primary" onClick={() => { handleCourse(data) }}>Submit</button>
                          </Modal.Footer>
                        </Modal>
                      </td>

                    </tr>
                    <tr>
                      <th>Course 2</th>
                      <td> {data.course2}
                        <button className="btn btn-danger" onClick={() => { setModel(true); setCourse(data.course2) }}><i class="bi bi-slash-circle"></i></button>
                        <Modal
                          show={model}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Deregister Course</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form className='f_form' >

                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Reason for Deregistration</label>
                                <textarea required class="form-control" id="exampleFormControlTextarea1" onChange={(e) => setReason(e.target.value)} rows="3"></textarea>
                              </div>


                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <button className="btn btn-primary" onClick={() => { handleCourse(data) }}>Submit</button>
                          </Modal.Footer>
                        </Modal> </td>
                    </tr>
                    <tr>
                      <th>Course 3</th>
                      <td> {data.course3}
                        <button className="btn btn-danger" onClick={() => { setModel(true); setCourse(data.course3) }}><i class="bi bi-slash-circle"></i></button>
                        <Modal
                          show={model}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Deregister Course</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form className='f_form' >

                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Reason for Deregistration</label>
                                <textarea required class="form-control" id="exampleFormControlTextarea1" onChange={(e) => setReason(e.target.value)} rows="3"></textarea>
                              </div>


                            </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <button className="btn btn-primary" onClick={() => { handleCourse(data) }}>Submit</button>
                          </Modal.Footer>
                        </Modal></td>
                    </tr>
                    <tr>
                      <th><label htmlFor="role" className='f_label form-label' ><b>Timeslot</b></label></th>

                      <td>  <br /><div className="form-switch">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => { handleday(1) }} id="inlineCheckbox1" value="monday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox1">Monday</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => { handleday(2) }} id="inlineCheckbox2" value="tuesday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox2">Tuesday</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => { handleday(3) }} id="inlineCheckbox3" value="wednesday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Wednesday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={(e) => { handleday(4) }} value="thursday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Thursday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e) => { handleday(5) }} id="inlineCheckbox3" value="friday" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Friday </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={(e) => { handleday(6) }} value="saturday" />
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



