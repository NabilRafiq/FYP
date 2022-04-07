import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

import './SignUp.css';
export default function SignUp() {


    useEffect(() => {
        // change background color with a random color
        const color = "#f0f2f0";
        document.body.style.background = color;
    });


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
    const [depart, setDepart] = useState('');

    const getInitialState = () => {
        const value = "Male";
        return value;
    };
    const [gender, setGender] = useState(getInitialState);
    const history = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection('coordinator').add({
                        name: name,
                        age: age,
                        number: number,
                        gender: gender,
                        email: email,
                        department: depart,
                        password: password,
                        role: "coordinator"
                    })
                    db.collection('users').add({
                        name: name,
                        age: age,
                        number: number,
                        gender: gender,
                        email: email,
                        department: depart,
                        password: password,
                        role: "coordinator"
                    })

                })
            alert("User Created Succuesfully")
            history('/', { replace: true })

        } catch (err) {
            alert(err.message)
        }

    }

    return (

        <div className="SignUp">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <div className="s_container">
                <form className='s_form' onSubmit={(e) => handleSubmit(e)}>
                    <h2 style={{ textAlign: 'left' }}><i class="bi bi-person-plus-fill"></i>Sign Up</h2>


                  
                    <input type="text" id='txt1' className="s_input form-control" placeholder="Username" name="uname" required onChange={(e) => setName(e.target.value)} />


                    {/* <label for="age" className='f_label form-label'><b>Date of Birth</b></label> */}
                    <input type="date" className="s_input form-control" max="1997-12-31" name="age" required onChange={(e) => setAge(e.target.value)} />

                    {/* <label for="number" className='form-label'><b>Mobile Number</b></label> */}
                    <input type="tel" size="11" className="s_input form-control" placeholder="Phone number" name="number" required onChange={(e) => setNumber(e.target.value)} />

                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class="bi bi-gender-ambiguous" style={{ fontSize: "large" }}></i></label>
                        <select onChange={(e) => setGender(e.target.value)} value={gender} class="form-select" id="inputGroupSelect01">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    {/* <label  className='form-label'><b>Department</b></label> */}
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class="bi bi-building fa-lg" ></i></label>
                        <select onChange={(e) => setDepart(e.target.value)} value={depart} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="CS">Computer Science </option>
                            <option value="MediaScience">Media Science </option>
                            <option value="AI">Aritificial Intelligence</option>
                            <option value="BA">Buisness Adminstration</option>
                        </select>
                    </div>
                    {/* <label for="email" className='form-label'><b>Email</b></label> */}
                    <input type="email" className="s_input form-control" placeholder="Enter Email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    {/* <label for="psw" className='form-label'><b>Password</b></label> */}
                    <input type="password" className="s_input form-control" placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)} />

                    {/* <label for="role" className='form-label'><b>Role</b></label> */}
                    <input type="text" className="s_input form-control" value="Coordinator" name="role" readOnly />


                    <div style={{ textAlign: 'left' }}>

                        <button className="s_button btn" type="submit" id='sbutton'>SignUp</button>
                        <p className='form-text'>Already have a account? <button className="s_button btn" style={{ width: '5%', color: '#178dee ', background: 'none' }} onClick={() => {
                            history('/', { replace: true })
                        }}>Login</button></p></div>


                </form>
            </div>



        </div>
    )
}