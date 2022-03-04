import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';



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
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        await firebase.db.collection("facultyform").where("timeslot", "==", time).get().then((querySnapshot) => {

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
                <div className="row">
                    <form className='search_form' onSubmit={(e) => handleSubmit(e)}>

                        <h5 style={{ textAlign: 'center' }}>Search Faculty Data</h5>

                        <select onChange={(e) => setTime(e.target.value)} value={time} class="form-select" id="inputGroupSelect01">
                            <option value="8:00am-11:30am">8:00am-11:30am</option>
                            <option value="11am-1:30pm">11am-1:30pm</option>
                            <option value="11am-1:30pm">11am-1:30pm</option>
                            <option value="4:30pm-7:00pm">4:30pm-7:00pm</option>
                        </select>


                        <button class="btn btn-outline-success search_btn" type="submit"><i class="bi bi-search"></i></button>

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