import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import '../../Coordinator/GetData/getdata.css';


export default function Deregistration() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [user, setUser] = useState("");
    const [course, setCourse] = useState(" ");
    const history = useNavigate();
    let docid = "1";
    let docid1 = "1";


    useEffect(() => {

        firebase.auth.onAuthStateChanged(user => {
            if (user) setUser(user.email)
            else setUser(null)
        })
        Fetchdata(user);
    }, []);


    const Fetchdata = async () => {

 
        await firebase.db.collection("deregistration").get()
            .then((querySnapshot) => {

                if (querySnapshot.empty) {
                    setLoading(false);
                    setShow(false);
                    setShow1(true)
                }
                else {
                    querySnapshot.forEach(element => {
                        var data = element.data();
                        setInfo(arr => [...arr, data]);

                        setLoading(false);
                        setShow(true);
                    })
                }

            })

    }
    const Accept = async (data) => {

        const confirmBox = window.confirm("Do you want to accept this request?");

        if (confirmBox == true) {
            await firebase.db.collection("facultyform").where("email", "==", data.email).get()
                .then(querySnapshot => {

                    querySnapshot.forEach(element => {
                        docid = element.id;
                        console.log("me chal rha hu")
                        var dat = element.data();
                        if (dat.course1 == data.course) {
                            setCourse("course1");
                        }
                        else if (dat.course2 == data.course) { setCourse("course2"); }
                        else if (dat.course3 == data.course) { setCourse("course3"); }

                    })



                })
            var washingtonRef = firebase.db.collection("facultyform").doc(docid);
            if (course == "course1") {
                await washingtonRef.update({
                    course1: "",
                })
                    .then(function () {
                        alert("Almost there!")
                        
                    })
                    .catch(function (error) {
                        alert(error.message)
                       
                    })
            }
            else if (course == "course2") {
                await washingtonRef.update({
                    course2: "",
                })
                    .then(function () {
                        alert("Almost there!")
                        
                    })
                    .catch(function (error) {
                        alert(error.message)
                        
                    })
            }
            else if (course == "course3") {
                await washingtonRef.update({
                    course3: "",
                })
                    .then(function () {
                        alert("Almost there!");
                       
                        
                    })
                    .catch(function (error) {
                        alert(error.message)
                       
                    })
            }

            await firebase.db.collection("course").where("name", "==", data.course).get()
   
            .then(querySnapshot => {
            
                querySnapshot.forEach(element => {
                   
                    docid1 = element.id;
                  
                })})
                var washingtonRef1 = firebase.db.collection("course").doc(docid1);
                await washingtonRef1.update({
                    faculty: "",
                })
                    .then(function () {
                        alert("Course Deregistered successfully");
                       
                        
                    })
                    .catch(function (error) {
                        alert(error.message)
                     
                    })
                    await firebase.db.collection("deregistration").where("course", "==", data.course).get()
                    .then(querySnapshot => {
                        querySnapshot.docs[0].ref.delete();
    
    
                    })
                    .catch((error) => {
                        alert(error.message)
                    })


              setTimeout(function () { window.location.reload() }, 3500);
        }

    }


    const Reject = async (data) => {

        const confirmBox = window.confirm("Do you want to reject this request?");
        if (confirmBox == true) {
            await firebase.db.collection("deregistration").where("course", "==", data.course).get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete();

                    alert("Request Rejected Successfully");


                })
                .catch((error) => {
                    alert(error.message)
                })

                setTimeout(function () { window.location.reload() }, 3500);
        }

    }



    return (
        <div>
            <Helmet>
                <title>Deregistation Requests</title>
            </Helmet>



            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
                <div className="row">
                    <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Course<i class="bi bi-clipboard-data"></i></h4>
                </div>
            </div>


            <div className="container" style={{ overflowX: "auto" }}>


                <table className='table table-striped' id='getData'>
                    <thead>

                        {
                            (() => {
                                if (loading && !show && !show1)
                                    return (<div class="text-center" style={{ margin: "10px" }}>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div></div>)

                                else
                                    return (

                                        <tr>
                                            <th scope='col'>Course</th>
                                            <th scope='col'>Faculty</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'>Field</th>
                                            <th scope='col'>Reason</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Accept</th>
                                            <th scope='col'>Reject</th>
                                        </tr>
                                    )
                            })()
                        }</thead>
                    <tbody>

                        {
                            (() => {
                                if (show && !loading)

                                    return (info.map((data) => (

                                        <tr>

                                            <td>
                                                {data.course}
                                            </td>
                                            <td>
                                                {data.faculty}
                                            </td>
                                            <td>
                                                {data.email}
                                            </td>
                                            <td>
                                                {data.field}

                                            </td>
                                            <td>
                                                {data.reason}
                                            </td>
                                            <td>
                                                Pending
                                            </td>

                                            {/* <td scope='col'>
                                                    <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                                </td> */}
                                            <td scope='col'>
                                                <button className="btn btn-success" onClick={() => { Accept(data) }}><i class="bi bi-pencil-square"></i></button>


                                            </td>
                                            <td scope='col'>
                                                <button className="btn btn-danger" onClick={() => { Reject(data) }}><i class="bi bi-trash"></i></button>
                                            </td>

                                        </tr>
                                    )))


                            })()
                        }

                    </tbody>



                </table>
                {(() => {
                    if (!loading && !show && show1)

                        return (

                            <h3 style={{ textAlign: "center" }}>No Request Found</h3>
                        )
                })()

                }  </div>
            <div className="d-flex justify-content-center">
                <button className="col-2 s_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                    history('/admin', { replace: true })
                }}>Back</button>
            </div>

        </div>)
}
