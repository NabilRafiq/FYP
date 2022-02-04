import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

import './SignUp.css';
export default function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [age, setAge] = useState('');
   
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
                        age:age,
                        number:number,
                        gender:gender,
                        email: email,
                        password: password,
                        role:"coordinator"
                    })
                    db.collection('users').add({
                        name: name,
                        age:age,
                        number:number,
                        gender:gender,
                        email: email,
                        password: password,
                        role:"coordinator"
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
                <title>SignUp</title>
            </Helmet>
         
            <div className="s_container container">
                <form className='s_form' onSubmit={(e) => handleSubmit(e)}>
                <h1 style={{ textAlign: 'center' }}>SignUp</h1>


                    <label style={{ marginTop: '10px' }} for="uname" className='form-label'><b>UserName</b></label>
                    <input type="text" className="s_input form-control" placeholder="Enter UserName" name="uname" required onChange={(e) => setName(e.target.value)} />

                    <label for="age" className='form-label'><b>Age</b></label>
                    <input type="number" className="s_input form-control" placeholder="Enter Age" name="age" required onChange={(e) => setAge(e.target.value)} />

                    <label for="number" className='form-label'><b>Mobile Number</b></label>
                    <input type="tel" size="11" className="s_input form-control" placeholder="03xxxxxxxxx" name="number" required onChange={(e) => setNumber(e.target.value)} />

<div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Gender</label>
  <select onChange={(e) => setGender(e.target.value)} value={gender} class="form-select" id="inputGroupSelect01">
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>
                    <label for="email" className='form-label'><b>Email</b></label>
                    <input type="email" className="s_input form-control" placeholder="Enter Email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label for="psw" className='form-label'><b>Password</b></label>
                    <input type="password" className="s_input form-control" placeholder="Enter Password" name="psw" required onChange={(e) => setPassword(e.target.value)} />
                   
                    <label for="role" className='form-label'><b>Role</b></label>
                    <input type="text" className="s_input form-control" value="Coordinator" name="role" readOnly />
                   
                   
                    <div style={{ textAlign: 'center' }}>

                        <button className="s_button btn" type="submit" id='sbutton'>SignUp</button>
                        <p className='form-text'>Already have a account? <button className="s_button btn" style={{ width:'5%', color: '#178dee ', background: 'none' }} onClick={() => {
                            history('/', { replace: true })
                        }}>Login</button></p></div>


                </form>
            </div>



        </div>
    )
}