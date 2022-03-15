import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import '../Coordinator/GetData/getdata.css'



export default function Filter() {


    const getInitialState = () => {
        const value = "8:00am-10:30am";
        return value;
    };

    const history = useNavigate();
    const [time, setTime] = useState(getInitialState);
    const [info, setInfo] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState(false);
    const [day1, setDay1] = useState(false);
    const [day2, setDay2] = useState(false);
    const [day3, setDay3] = useState(false);
    const [day4, setDay4] = useState(false);
    const [day5, setDay5] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();
        const days = day + " " + day1 + " " + day2 + " " + day3 + " " + day4 + " " + day5;
        setLoading(true);

        await firebase.db.collection("facultyform").where("timeslot", "==", time).where("day", "==", days).get().then((querySnapshot) => {

            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);


                });
                setShow(true);
                setLoading(false);
            }
            else {
                alert("Profile Doesn't Exist");
                setLoading(false);

            }

        })
            .catch((error) => {
                alert(error.message);

            })

    }

    const handleUser = async (e) => {
        const user = firebase.auth.currentUser;
        await firebase.db.collection("users").where("email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                if (data.role === "admin") {
                    history('/Admin', { replace: true })
                }
                else if (data.role === "coordinator") {
                    history('/Dashboard', { replace: true })
                }


            })
        });
    }


    return (
        <div className='Search'>
            <Helmet>
                <title>Search Faculty</title>
            </Helmet>


            <div className="container-sm search_container" style={{ textAlign: "center" }}>
            <h5 style={{ textAlign: 'center',padding:"10px",margin:"10px" }}>Search Faculty Data</h5>
                <div className="row srow d-flex justify-content-center">
                    <form className='search_form' onSubmit={(e) => handleSubmit(e)}>

                      

                        <div className="container">
                            <div className="form-switch">
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
                        </div>

                        <select onChange={(e) => setTime(e.target.value)} value={time} class="form-select" id="inputGroupSelect01">
                            <option value="8:00am-10:30am">8:00am-10:30am</option>
                            <option value="11am-1:30pm">11am-1:30pm</option>
                            <option value="1:45pm-4:15pm">1:45pm-4:15pm</option>
                            <option value="4:30pm-7:00pm">4:30pm-7:00pm</option>
                        </select>

                            <div className="d-flex justify-content-center">
                        <button className="btn btn1 btn-outline-success" type="submit"><i class="bi bi-search"></i></button>
                        </div>
                    </form> </div>


            </div>


            <br /> <hr /> <br />
            <div className="container">



                <h4 style={{ textAlign: "center", marginTop: "-10px" }}>Faculty Data</h4>


                <table style={{ marginTop: "30px" }} id="search" className='table table-striped'>
                    <thead>
                        {
                            (() => {
                                if (!show && loading) {

                                    return (
                                        <div class="text-center" style={{ margin: "10px" }}>
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div></div>


                                    )
                                    setShow(false);

                                }
                                else if (show) {
                                    return (<tr >
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Age</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Field</th>
                                        <th scope='col'>Qualification</th>
                                        <th scope='col'>TimeSlot</th>
                                    </tr>)
                                }
                            })()
                        }
                    </thead>
                    <tbody>

                        {


                            info.map((data) => (
                                <tr >

                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.age}
                                    </td>
                                    <td>
                                        {data.email}
                                    </td>
                                    <td>
                                        {data.field}

                                    </td>
                                    <td>
                                        {data.qualification}

                                    </td>
                                    <td>
                                        {data.timeslot}

                                    </td>

                                    {/* <th scope='col'>
                                      
                                        <button className="btn btn-primary" onClick={()=>handleUpdate(data)}><i class="bi bi-pencil-square"></i></button>

                                       
                                    </th> */}
                                </tr>
                            ))
                        } </tbody></table>
                <div className="d-flex justify-content-center">
                    <button id='search_btn' style={{ width: "15%" }} className='search_btn btn'
                        onClick={
                            (e) => { handleUser(e) }
                        }>Back</button></div>

            </div>
        </div>


    )
}