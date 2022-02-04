import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './AdminFaculty.css'



export default function AdminFaculty() {
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
                db.collection('facultyform').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "faculty"

                })
                db.collection('users').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "faculty"

                })
                alert("Faculty data added successfully")
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
                <title>Faculty Form</title>
            </Helmet>


            <div className="container-sm af_container">
                <form className='af_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}>Faculty Form</h3>

                    <label for="uname" className='af_label form-label'><b>Name</b></label>
                    <input type="text" className='af_input  form-control' placeholder="Enter Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />


                    <label for="age" className='af_label form-label'><b>Age</b></label>
                    <input type="number" className='af_input form-control' placeholder="Enter Age" name="age" value={age} required onChange={(e) => setAge(e.target.value)} />

                    <label for="qual" className='af_label form-label' ><b>Qualification</b></label>
                    <input type="text" className='af_input form-control' placeholder="Enter Qualification" name="qual" value={qualification} required onChange={(e) => setQualification(e.target.value)} />
                    <label for="field" className='af_label form-label'><b>Field</b></label>
                    <input type="text" className='af_input form-control' placeholder="Enter Field" name="field" value={field} required onChange={(e) => setField(e.target.value)} />
                    <label for="Email" className='af_label form-label'><b>Email</b></label>
                    <input type="email" className='af_input form-control' placeholder="Enter Email" name="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    <label for="psw" className='af_label form-label'><b>Password</b></label>
                    <input type="password" className='af_input form-control' placeholder="Enter Password" name="psw" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    <label for="role" className='af_label form-label' ><b>Role</b></label>
                    <input type="text" disabled className='af_input form-control' readonly  value="Faculty" name="role" />



                    <button id='af_button' type="submit" className='af_button btn'>Submit</button>
                    <button className='af_button btn' style={{ color: 'black', backgroundColor: 'white' }}
                        onClick={() => {
                            history('/Admin', { replace: true })
                        }}>Back</button>



                </form>

            </div>
        </div>

    )
}