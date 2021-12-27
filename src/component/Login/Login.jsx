import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import './Login.css';


export default function Login() {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate()

   
 

    const handleSubmit = async (e) => {
        e.preventDefault()
      
   
        try {
            // console.log(email+password)
            const result = await auth.signInWithEmailAndPassword(email, password);
            if ( result.user.email=="admin@admin.com"&&
            result.user.password=="admin1"){
                history('/admin', { replace: true }) 
            }
            else{

            
            history('/dashboard', { replace: true })}
        } catch (err) {
            alert(err.message);
        }
    
    }


    return (
        <div className="Login">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <h1 style={{ textAlign: 'center', margin: '5px' }}>Login</h1>



            <div className="l_container container-sm ">
            <form className='l_form' onSubmit={(e) => handleSubmit(e)}>


              
                    <label for="uname" className='form-label'><b>Email</b></label>
                    <input className='l_input form-control' type="email" placeholder="Enter Email" name="uname" required onChange={(e) => setEmail(e.target.value)} />

                    <label for="psw" className='form-label'><b>Password</b></label>
                    <input type="password" className='l_input form-control' placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)} />
                    <div style={{ textAlign: 'center' }}>

                        <button className="l_button btn" type="submit" id='lbutton'>Login</button>
                      
                        <p className='form-text col'>Don't have an account? <button className="col-2 l_button btn" style={{padding:'2px' ,width: '17%', color: '#178dee ', background: 'none' }} onClick={() => {
                            history('/SignUp', { replace: true })
                        }}>SignUp</button></p></div>
               

            </form>

            </div>

        </div>
    )
}