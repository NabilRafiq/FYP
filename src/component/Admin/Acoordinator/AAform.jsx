import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './AAform.css'



export default function AAform() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [qualification, setQualification] = useState("");
    const [field, setField] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await auth.createUserWithEmailAndPassword(email, password)

            .then(() => {
                db.collection('coordinator').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "coordinator"

                })
                db.collection('users').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "coordinator"

                })
                alert("Academic Coordinator data added successfully")
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
                <title>Coordinator Form</title>
            </Helmet>


            <div className="container-sm aaf_container">
                <form className='aaf_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}><i class="bi bi-person-plus-fill"></i>Cordinator registration</h3>

                    <label for="uname" className='aaf_label form-label'><b>Name</b></label>
                    <input type="text" className='aaf_input  form-control' name="uname" required value={name} onChange={(e) => setName(e.target.value)} />


                    <label for="age" className='aaf_label form-label'><b>Age</b></label>
                    <input type="number" className='aaf_input form-control'  name="age" value={age} required onChange={(e) => setAge(e.target.value)} />

                    <label for="qual" className='aaf_label form-label' ><b>Qualification</b></label>
                    <input type="text" className='aaf_input form-control'  name="qual" value={qualification} required onChange={(e) => setQualification(e.target.value)} />
                    <label for="field" className='aaf_label form-label'><b>Field</b></label>
                    <input type="text" className='aaf_input form-control'  name="field" value={field} required onChange={(e) => setField(e.target.value)} />
                    <label for="Email" className='aaf_label form-label'><b>Email</b></label>
                    <input type="email" className='aaf_input form-control'  name="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    <label for="psw" className='aaf_label form-label'><b>Password</b></label>
                    <input type="password" className='aaf_input form-control'  name="psw" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    <label for="role" className='aaf_label form-label' ><b>Role</b></label>
                    <input type="text" disabled className='aaf_input form-control' readonly  value="Coordinator" name="role" />



                    <button id='aaf_button' type="submit" className='aaf_button btn'>Submit</button>
                    <button className='aaf_button btn' style={{ color: 'black', backgroundColor: 'white' }}
                        onClick={() => {
                            history('/Admin', { replace: true })
                        }}>Back</button>



                </form>

            </div>
        </div>

    )
}