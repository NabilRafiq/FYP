import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';


import './Login.css';


export default function Login() {


  useEffect(() => {
    // change background color with a random color
    const color =  "#f0f2f0";
    document.body.style.background = color;
  });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useNavigate()





    const handleSubmit = async (e) => {


        e.preventDefault()

        try {


            await auth.signInWithEmailAndPassword(email, password)

                .then(() => {
                    db.collection("users")
                    .where("email", "==", email).get()
                    .then(function(querySnapshot) {
                        if (querySnapshot.empty) {
                            alert("User doesn't exists");
                        }
                        else {
                            
                  

                    db.collection("users").where("email", "==", email).get().then(querySnapshot => {
                        querySnapshot.forEach(element => {
                            var data = element.data();


                            if (data.role === "admin") {
                                history('/Admin', { replace: true })
                            }
                            else if (data.role === "coordinator") {
                                history('/Dashboard', { replace: true })
                            }
                            else if (data.role === "faculty") {
                                history('/Faculty', { replace: true })
                            }
                            else {
                                alert("Data doesn't exists")
                            }
                            

                        })
                    });
                }})})


          
        } catch (err) {
            alert(err.message);
        }

    }


    return (
      
        <div className="Login">
            <Helmet >
            <title>Login</title>
            </Helmet>
                <div className="  l_container container-sm">
                <form className='l_form' >
              
                    <h3 style={{ textAlign: 'left', margin: '10px' }}>Sign In</h3>
                    <label htmlFor="uname" className='form-label'><b>Email</b></label>
                  
                    <input  className='l_input form-control' type="email" placeholder="Enter a valid Email address" name="uname" required onChange={(e) => setEmail(e.target.value)} />
                    
                    <label htmlFor="psw" className='form-label'><b>Password</b></label>
                    <input type="password" className='l_input form-control' placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)} />
                    <div /*style={{ textAlign: 'center' }}*/ className='login-btn-nd-text'>

                        <button className="l_button btn" type="submit" id='lbutton' onClick={(e) => handleSubmit(e)}>Submit</button>
                        {/* <button className="l_button btn" style={{marginLeft:"2px",width:"40%"}} id='lbutton' onClick={() => {
                            history('/ForgotPass', { replace: true })
                        }}>Forgot Password</button> */}


                        

                        <p className='form-text col text-gap'>Don't have an account? <button className="col-2 l_button btn" style={{ padding: '2px', width: '17%', color: '#178dee ', background: 'none' }} onClick={() => {
                            history('/SignUp', { replace: true })
                        }}>Register</button></p>





                    </div>


                </form>


            </div>

        </div>
      
    )
}