import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import '../../SignUp/SignUp.css'




export default function Announcement() {


    const history = useNavigate()
    const [info, setInfo] = useState("");
    const [info1, setInfo1] = useState("");
    const [err, setErr] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");




    useEffect(() => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) setUser(user.email)
            else setUser(null)
          })
        Fetchdata1(user);
    }, []);
    const Fetchdata1 = async (user) => {

        await firebase.db.collection("annoucement").get().then((querySnapshot) => {

            if (!querySnapshot.empty) {
                const user2 = firebase.auth.currentUser;
                firebase.db.collection("annoucement").where("email", "==", user2.email).get().then((querySnapshot) => {

                    querySnapshot.forEach(element => {
                    console.log("wait for it");
                    })
                 } )}})
    Fetchdata();
                }

    const Fetchdata = async () => {
        
        await firebase.db.collection("users").where("email", "==", user).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                console.log(data.role)

                firebase.db.collection("annoucement").where("role", "==", data.role).get().then((querySnapshot) => {
                    console.log("me chal rha hu")
                    if (!querySnapshot.empty) {

                        querySnapshot.forEach(element => {
                            var data = element.data();
                            setInfo(arr => [...arr, data]);


                        });
                        setLoading(false);
                        setErr(false);
                        setShow(true);

                    }
                    else {
                        setLoading(false);
                        setErr(true);
                        setShow(false);

                    }

                })
                    .catch((error) => {
                        setLoading(false)
                        setShow(false);
                        alert(error.message);



                    })




            })
        });
        await firebase.db.collection("annoucement").where("role", "==", "all").get().then((querySnapshot) => {

            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo1(arr => [...arr, data]);


                });
                setLoading(false);
                setErr(false);
                setShow1(true);

            }
            else {
                setLoading(false);
                setErr(true);
                setShow1(false);

            }

        })
            .catch((error) => {
                setLoading(false)
                setShow1(false);
                alert(error.message);



            })




    }

    const handleUser = async (e) => {
        const user = firebase.auth.currentUser;
        await firebase.db.collection("users").where("email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                if (data.role === "faculty") {
                    history('/Faculty', { replace: true })

                }
                else if (data.role === "coordinator") {
                    history('/Dashboard', { replace: true })
                }


            })
        });
    }


    return (



        <div>
            <Helmet>
                <title>Annoucements</title>
            </Helmet>




            <h2 style={{ textAlign:"center"}}>Announcements</h2>
            <div className="s_container  d-flex justify-content-center" style={{ marginTop : "40px" }}>
            
        
                {(() => {

                    if (show1) {
                        return (
                            
                            info1.map((data) => (
                                <div className="container" style={{ display: "block" }}>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingOne">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                {data.title}
                                            </button>
                                        </h2>
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                {data.detail}
                                                { }
                                            </div>
                                        </div>
                                    </div></div>
                            )))
                    }
                })()}
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
                                No annoucement available at this moment please check back later!
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
                                                {data.title}
                                            </button>
                                        </h2>
                                        {console.log("me bhi chal rha hu")}
                                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                {data.detail}
                                            </div>
                                        </div>
                                    </div></div>

                            )))
                    } { console.log("me chal rha hu") }

                })()}

            </div>

                <div className="d-flex justify-content-center">
            <button className='ms-3 my-2' style={{ color: 'black', backgroundColor: 'white', border: 'none' }}
                onClick={
                    (e) => { handleUser(e) }
                }>Back</button></div>

        </div>
    )

}