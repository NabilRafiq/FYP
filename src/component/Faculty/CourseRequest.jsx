import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import '../SignUp/SignUp.css';




export default function CourseRequest() {


    const history = useNavigate()
    const [info, setInfo] = useState("");
    const [err, setErr] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [course1, setCourse1] = useState(" ");
    const [course2, setCourse2] = useState(" ");
    const [course3, setCourse3] = useState(" ");
    let docid1 = "";


    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) setUser(user.email)
            else setUser(null)
        })
        Fetchdata1(user);
    }, []);


    const Fetchdata1 = async (user) => {
        await firebase.db.collection("course").get().then((querySnapshot) => {

            if (!querySnapshot.empty) {
                const user2 = firebase.auth.currentUser;
                firebase.db.collection("facultyform").where("email", "==", user2.email).get().then((querySnapshot) => {

                    querySnapshot.forEach(element => {
                        var dete1 = element.data();
                        setCourse1(dete1.course1);
                        setCourse2(dete1.course2);
                        setCourse3(dete1.course3);})})
    }})
    const user1 = firebase.auth.currentUser;
    Fetchdata(user1.email)
}
    const Fetchdata = async (user1) => {

        
              await  firebase.db.collection("request").where("faculty", "==", user1).get().then((querySnapshot) => {

                    if (querySnapshot.empty) {
                        console.log("mekhalihu")
                        setLoading(false);
                        setErr(true);
                        setShow(false);

                    }
                    else {
                       
                        querySnapshot.forEach(element => {
                            var data = element.data();
                            setInfo(arr => [...arr, data]);                   

                        });
                        setLoading(false);
                        setErr(false);
                        setShow(true);

                    }

                })
                    .catch((error) => {
                        setLoading(false)
                        setShow(false);
                        alert(error.message);



                    })




      
     

    }
    const Accept = async (data) => {
        const confirmBox = window.confirm("Do you want to accept this request?");
        console.log(course1);
        console.log(course2);
        console.log(course3);
        if (confirmBox == true) {
            if (course3 == "" || course2 == "" || course1 == "") {
                firebase.db.collection('course').add({
                    faculty: data.faculty,
                    name: data.name,
                    CHRS: data.CHRS,
                    qualification: data.qualification,
                    field: data.field,

                })
                    .then(() => {
                        alert("Almost There!");
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
                await firebase.db.collection("facultyform").where("email", "==", data.faculty).get()
                    .then(querySnapshot => {

                        querySnapshot.forEach(element => {
                            docid1 = element.id;


                        })




                    });
                var washingtonRef1 = firebase.db.collection("facultyform").doc(docid1);


                if (course1 == "") {

                    await washingtonRef1.update({
                        course1: data.name
                    })
                        .then(function () {

                            alert("Data updated successfully")

                        })
                        .catch(function (error) {
                            alert(error.message)

                        })
                }
                else if (course1 != "" && course2 == "") {
                    await washingtonRef1.update({
                        course2: data.name
                    })
                        .then(function () {

                            alert("Data updated successfully")

                        })
                        .catch(function (error) {
                            alert(error.message)

                        })
                }
                else if (course1 != "" && course2 != "" && course3 == "") {
                    await washingtonRef1.update({
                        course3: data.name
                    })
                        .then(function () {

                         firebase.db.collection("request").where("name", "==", data.name).where("faculty", "==", data.faculty).get()
                            .then(querySnapshot => {
                                querySnapshot.docs[0].ref.delete();
            
                                alert("Data Updated Successfully");
            
            
                            })
                            .catch((error) => {
                                alert(error.message)
                            })
            
                        setTimeout(function () { window.location.reload() }, 3500);

                        })
                        .catch(function (error) {
                            alert(error.message)

                        })
                }
            }
            else {  
                alert("Course limit reached")
            }
        }
    }
    const Deny = async (data) => {
        const confirmBox = window.confirm("Do you want to reject this request?");
        console.log(data.name+data.faculty)
        if (confirmBox == true) {

            await firebase.db.collection("request").where("name", "==", data.name).where("faculty", "==", data.faculty).get()
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
                <title>Course Requests</title>
            </Helmet>





            <div className="s_container d-flex justify-content-center">

                {(() => {


                    if (loading) {
                        return (
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>)

                    }

                    else if (err) {
                        return (<div className="position-absolute top-50 start-50 translate-middle">
                            <div class="alert alert-danger" role="alert">
                                No request found at this moment please check back later!
                            </div></div>)
                    }
                    else if (show) {
                        { console.log(info) }

                        return (

                            info.map((data) => (

                                <div className="container">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                {data.name}
                                            </button>
                                        </h2>
                                        {console.log("me bhi chal rha hu")}
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <table>
                                                <tr>
                                            <th >Course</th>
                                                <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <th>CHRS</th>
                                                <td>{data.CHRS}</td>
                                        </tr>
                                        <tr>
                                            <th >Field</th>
                                                <td>{data.field}</td>
                                        </tr>
                                        <tr>
                                            <th >Qualification</th>
                                                <td>{data.qualification}</td>
                                        </tr>

                                                </table>
                                                <button className="btn btn-success" onClick={() => { Accept(data) }}>Accept Request</button>
                                                <button className="btn btn-danger" onClick={() => { Deny(data) }}>Deny Request</button>
                                            </div>
                                        </div>
                                    </div></div>

                            )))
                    } { console.log("me chal rha hu") }

                })()}

            </div>


            <div className="d-flex justify-content-center">
                <button className="col-2 a_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                    history('/faculty', { replace: true })
                }}>Back</button></div>

        </div>
    )

}