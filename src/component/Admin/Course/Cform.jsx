import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './Cform.css'



export default function Cform() {



    const [name, setName] = useState("");
    const [hour, setHour] = useState(1);
    const [field, setField] = useState("ComputerScience");
    const [qualification, setQual] = useState("Bachelors");
    const [faculty, setFaculty] = useState("");
    const [copy, setCopy] = useState(false);

    // const [depart, setDepart] = useState("");
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

         db.collection("course").get().then((querySnapshot) => {
          
            if (!querySnapshot.empty) {

                for (var i in querySnapshot.docs) {
                    const doc = querySnapshot.docs[i]
                    var dete = doc.data();


                    if (dete.name == name) {
                        console.log(dete.name==name);
                        setCopy(true);
                        break;

                    }
                    else{
                        setCopy(false)
                    }
                }
            }
            else{
                setCopy(false)
            }



        })
            .catch((error) => {
                alert(error.message);
            })


        if (copy != false) {
             
                alert("Course already exists")
        }
        else {
            await db.collection('course').add({
                
                name: name,
                hour: hour,
                field: field,
                qualification: qualification,
                faculty:faculty
                // depart : depart

                    })
                .then(() => {

                    alert("Course data added successfully")
                })
                .catch((error) => {
                    alert(error.message);
                })
        }

        setName("");
        setHour("");
        console.log(copy)
        // setDepart("");

    }
    const handleUser = async (e) => {
        const user = auth.currentUser;
        await db.collection("users").where("email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                if (data.role === "admin") {
                    history('/admin', { replace: true })

                }
                else if (data.role === "coordinator") {
                    history('/Dashboard', { replace: true })
                }


            })
        });
    }
    return (
        <div className='Form'>
            <Helmet>
                <title>Course Form</title>
            </Helmet>

{console.log(hour)}
            <div className="container-sm cf_container">
                <form className='cf_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}>Course Form</h3>

                    <label for="uname" className='cf_label form-label '><b>Course Name</b></label>
                    <input type="text" className='cf_input  form-control inp inp-brd' placeholder="Enter Course Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />

                    <div class="input-group mb-3 inp">
                        <label class="input-group-text" for="inputGroupSelect01"><b>Credit Hour</b></label>
                        <select onChange={(e) => setHour(e.target.value)} value={hour} class="form-select" id="inputGroupSelect01">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>

                    <div class="input-group mb-3 inp">
                        <label class="input-group-text" for="inputGroupSelect01"><b>Field</b></label>
                        <select onChange={(e) => setField(e.target.value)} class="form-select" id="inputGroupSelect01">
                            <option value="ComputerScience">ComputerScience</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="MediaScience">MediaScience</option>
                            <option value="Buisness Adminstration">Buisness Adminstration</option>
                        </select>
                    </div>
                    <div class="input-group mb-3 inp">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                        <select onChange={(e) => setQual(e.target.value)} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="Bachelors">Bachelors</option>
                            <option value="Master">Master</option>
                            <option value="Mphil">Mphil</option>
                            <option value="PHD">PHD</option>
                        </select>
                    </div>
                    {/* 
                    <label for="depart" className='cf_label form-label' ><b>Program</b></label>
                    <input type="text" className='cf_input form-control' placeholder="Enter Program" name="depart" value={depart} required onChange={(e) => setDepart(e.target.value)} /> */}


                    <button id='cf_button' type="submit" className='cf_button btn inp inp-brd'>Submit</button>
               



                </form>
                <div className="d-flex justify-content-center">
            <button className='ms-3 my-2' style={{ color: 'black', background: 'none', border: 'none' }}
                onClick={
                    (e) => { handleUser(e) }
                }>Back</button></div>
            </div>
        </div>

    )
}