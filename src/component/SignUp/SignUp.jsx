import React, { useState, useEffect } from 'react';
import * as firebase from '../../firebase';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

import './SignUp.css';
export default function SignUp() {



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [qualification, setQualification] = useState("");
    const [field, setField] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.auth.createUserWithEmailAndPassword(email, password)

            .then(() => {
                firebase.db.collection('coordinator').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "coordinator",
                    

                })
                firebase.db.collection('users').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "coordinator",
                   

                })
                alert("SignUp Successful")
            })
            .catch((error) => {
                alert(error.message);
            })
        setName("");
        setEmail("");
        setAge("");
        setQualification("");
        setField("");
        setPassword("");

    }



    return (
        <div className='Form'>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>


            <div className="container-sm f_container">
                <form className='f_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}><i class="bi bi-person-plus-fill"></i></h3>
                   
                    <label for="uname" className='f_label form-label'><b>Name</b></label>
                    <input type="text" className='f_input  form-control' name="uname" required onChange={(e) => setName(e.target.value)} />
                    

                    <label for="age" className='f_label form-label'><b>Date of Birth</b></label><br />
                    <input type="date" className="s_input form-control" max="1997-12-31" id='dt' name="age" required onChange={(e) => setAge(e.target.value)} />
                    
                    <label className='f_label form-label'><b>Program</b></label><br />
                   <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                        <select onChange={(e) => setQualification(e.target.value)} value={qualification} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="Bachelors">Bachelors</option>
                            <option value="Master">Master</option>
                            <option value="Mphil">Mphil</option>
                            <option value="PHD">PHD</option>
                        </select>
                    </div>
                    <label className='f_label form-label'><b>Department</b></label><br />
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-school'></i></label>
                        <select onChange={(e) => setField(e.target.value)} value={field} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="ComputerScience">ComputerScience</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="MediaScience">MediaScience</option>
                            <option value="Buisness Adminstration">Buisness Adminstration</option>
                        </select>
                    </div>
                    <label for="Email" className='f_label form-label'><b>Email</b></label>
                    <input type="email" className='f_input form-control'  name="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    <label for="psw" className='f_label form-label'><b>Password</b></label>
                    <input type="password" className='f_input form-control'  name="psw" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    <label for="role" className='f_label form-label' ><b>Role</b></label>
                    <input type="text" disabled className='f_input form-control' readonly value="coordinator" name="role" />



                    <button id='f_button' type="submit" className='f_button btn my-3'>Submit</button>
                
                  


                </form>
                <button className="col-2 s_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                            history('/', { replace: true })
                        }}>Back</button>
            </div>
        </div>

    )
}