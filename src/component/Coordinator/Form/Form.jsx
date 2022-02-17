import React, { useState , useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './form.css'



export default function Form() {

    useEffect(() => {
        // change background color with a random color
        const color =  "#f0f2f0";
        document.body.style.background = color;
      });


    
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
                firebase.db.collection('facultyform').add({
                    name: name,
                    email: email,
                    age: age,
                    qualification: qualification,
                    field: field,
                    password: password,
                    role: "faculty"

                })
                firebase.db.collection('users').add({
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
        <div className='Form'>
            <Helmet>
                <title>Faculty Form</title>
            </Helmet>


            <div className="container-sm f_container">
                <form className='f_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}><i class="bi bi-person-plus-fill"></i></h3>

                    <label for="uname" className='f_label form-label'><b>Name</b></label>
                    <input type="text" className='f_input  form-control' placeholder="Enter Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />


                    <label for="age" className='f_label form-label'><b>Date of Birth</b></label>
                    <input type="date" className="s_input form-control" max="1997-12-31" name="age" required onChange={(e) => setAge(e.target.value)} />
                    
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                        <select onChange={(e) => setQualification(e.target.value)} value={qualification} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="bachelors">Bachelors</option>
                            <option value="masters">Master</option>
                            <option value="mphil">Mphil</option>
                            <option value="phd">PHD</option>
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-school'></i></label>
                        <select onChange={(e) => setField(e.target.value)} value={field} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="CS">ComputerScience</option>
                            <option value="AI">Artificial Intelligence</option>
                            <option value="MediaScience">MediaScience</option>
                            <option value="BA">Buisness Adminstration</option>
                        </select>
                    </div>
                    <label for="Email" className='f_label form-label'><b>Email</b></label>
                    <input type="email" className='f_input form-control' placeholder="Enter Email" name="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    <label for="psw" className='f_label form-label'><b>Password</b></label>
                    <input type="password" className='f_input form-control' placeholder="Enter Password" name="psw" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    <label for="role" className='f_label form-label' ><b>Role</b></label>
                    <input type="text" disabled className='f_input form-control' readonly  value="faculty" name="role" />



                    <button id='f_button' type="submit" className='f_button btn'>Submit</button>
                    <button className='f_button btn' style={{ color: 'black', backgroundColor: 'white' }}
                        onClick={
                          (e)=> {handleUser(e)}
                        }>Back</button>



                </form>

            </div>
        </div>

    )
}