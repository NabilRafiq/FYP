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
    const [role, setRole] = useState("");



    useEffect(() => {

        Fetchdata();
    }, []);


    const Fetchdata = async () => {


        const user = firebase.auth.currentUser;
        await firebase.db.collection("users").where("email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setRole(data.role);

            })
        });

        await firebase.db.collection("annoucement").where("role", "==", role).get().then((querySnapshot) => {

            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);


                });
                setLoading(false);
                setErr(false);
                setShow(true);
                setShow1(false)
                console.log("me chal rha hu")
            }
            else {
                setLoading(false);
                setErr(true);
                setShow(false);
                setShow1(false)
                console.log("me chal rha hu1")
            }

        })
            .catch((error) => {
                setLoading(false)
                setShow(false);
                alert(error.message);
                setShow1(false)



            })

        await firebase.db.collection("annoucement").where("role", "==", "both").get().then((querySnapshot) => {

            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var data1 = element.data();
                    setInfo1(arr => [...arr, data1]);


                });
                setShow1(true)
                setLoading(false);
                setErr(false);
                console.log("me chal rha hu2")
            }
            else {
                setShow1(false);
                setLoading(false);
                setErr(true);
            }

        })


    }



    return (



        <div>
            <Helmet>
                <title>Annoucements</title>
            </Helmet>





            <div className="s_container">

                {(() => {
                    if (loading && !show && !err) {

                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>

                    }

                    else if (!loading && !show && err){
                        <div className="d-flex justify-content-center">
                                <div class="alert alert-danger" role="alert">
                                    No Course available at this moment please check back later!
                                </div></div>
                    }
                    else if (!loading && show && !err){
                        
                        info.map((data) => (
                            
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {data.title}
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
                {data.detail}
      </div>
    </div>
  </div>
                        ))
                    }
                    else if (!loading && !show && !err &&show1){
                        
                        info1.map((data) => (
                            
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {data.title}
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
                {data.detail}
      </div>
    </div>
  </div>
                        ))
                    }
                    else if (!loading && show && !err && show1){
                        
                        info1.map((data) => (
                            
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                {data.title}
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
                {data.detail}
      </div>
    </div>
  </div>
                        ))
                        info.map((data) => (
                            
                            <div class="accordion-item">
                              <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                          {data.title}
                                </button>
                              </h2>
                              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                          {data.detail}
                                </div>
                              </div>
                            </div>
                                                  ))
                    }

                })()}
            </div>
        </div>
    )

}