import React, { useState } from 'react';
import './Faculty.css'
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Dashboard() {
    const history = useNavigate()

    const [info, setInfo] = useState([]);
    const [disable, setDisable] = React.useState(false);
 
    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await firebase.auth.signOut();
            history('/', { replace: true })
        } catch (err) {
            alert(err.message);
        }
    }

      
  
  

    const userInformation = async (e) => {
        
        const user = firebase.auth.currentUser;

        setDisable(true);
    
        try {
            
            await  firebase.db.collection("facultyform").where("email", "==", user.email).get()
            .then(querySnapshot => { 
                   
                        querySnapshot.forEach(element => {
                            var data = element.data();
                            setInfo(arr => [...arr, data]);

                            

                        })
                    });
                   
              

        } catch (err) {
            alert(err.message);
        }
    
    }

return (
    <div className="Dashboard">
        <Helmet>
            <title>Faculty Dashboard</title>
        </Helmet>

        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#192841' }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse" id="navbarNavDropdown" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" >Home</a>
                        </li>
                        {/* <li className="nav-item">
          <a className="nav-link" >Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" >Pricing</a>
        </li> */}
                        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Faculty
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/facultyform',{replace:true})}}
                 className="dropdown-item" >
                Faculty Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Faculty Data
                </a></li>
            {/* <li><a className="dropdown-item" >Another action</a></li>
            <li><a className="dropdown-item" >Something else here</a></li> */}
                        {/* </ul>
        </li> */}
                        <li className="nav-item">
                            {<a onClick={handleLogout} style={{ cursor: 'pointer' }} className="nav-link active" aria-current="page" >
                                Logout
                            </a>
         /*   async function handleLogout  (){
    await auth.signOut();

    history("/login",{replace:true})
  } 
          */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



        <div className="container">

            <h3 style={{ textAlign: "center", margin: '50px' }}>User's Information</h3>

        <button disabled={disable} className='fa_button btn d-grid gap-2 col-6 mx-auto' type='button' onClick={() => { userInformation() }}>Load Information</button>

            <div className="row">
            {


info.map((data) => (
                <form action="" className="faform">
                
                    <label for="uname" className='fa_label form-label'><b>Name</b></label>
                    <input type="text" readOnly value={data.name} className='fa_input form-control' placeholder="Enter Name" name="uname" />


                    <label for="age" className='fa_label form-label'><b>Age</b></label>
                    <input type="number" readOnly value={data.age} className='fa_input form-control' placeholder="Enter Age" name="age" />

                    <label for="qual" className='fa_label form-label' ><b>Qualification</b></label>
                    <input type="text" readOnly value={data.qualification} className='fa_input form-control' placeholder="Enter Qualification" name="qual" />
                    <label for="field" className='fa_label form-label'><b>Field</b></label>
                    <input type="text" readOnly value={data.field} className='fa_input form-control' placeholder="Enter Field" name="field" />
                    <label for="Email" className='fa_label form-label'><b>Email</b></label>
                    <input type="email" readOnly value={data.email} className='fa_input form-control' placeholder="Enter Email" name="Email" />
                    <label for="role" className='f_label form-label' ><b>Role</b></label>
                    <input type="text" readOnly value={data.role} disabled className='fa_input form-control' readonly  name="role" />

                </form>
))}
                </div>


        </div>


    </div>
)}




