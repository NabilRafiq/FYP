import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './Search.css'



export default function Search() {
 
    const history = useNavigate();
    const [stext, setStext] = useState('');
    const [info, setInfo] = useState([]);
    // const eachItemDiplay = "inline-block";
    // const eachItemDiplay1 = "none";
    var name;
    var email;
    var age;
    var qual;
    var field
    const handleSubmit = async (e) => {
            e.preventDefault();
    

         
           
         await db.collection("facultyform").where("email", "==", stext).get().then((querySnapshot) => {
    
            if (!querySnapshot.empty) {
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
                   
                
                });
            }
            else {
                alert("Profile Doesn't Exist");
            
         }
         

            })
            .catch((error) => {
                alert(error.message);
               
                
           
            })
        
        
        }


    
    
    return (
        <div className='Search'>
            <Helmet>
                <title>Search Faculty</title>
            </Helmet>


            <div className="container-sm search_container" style={{textAlign:"center"}}>
                <div className="row">
                    <form className='search_form' onSubmit={(e) => handleSubmit(e)}>

                        <h3 style={{ textAlign: 'center' }}>Search Faculty Data</h3>

                        <input class="form-control me-2 search_input" type="email" placeholder="Search Faculty Data" 
                        onChange={(e) => setStext(e.target.value)} aria-label="Search" required  />
                        
                        
                        <button class="btn btn-outline-success search_btn" type="submit"><i class="bi bi-search"></i></button>

                    </form> </div>
                <button id='search_btn' style={{width:"15%"}} className='search_btn btn'
                    onClick={() => {
                        history('/Admin', { replace: true })
                    }}>Back</button>

            </div>

            <div className="container">

           <div style={{display:"none"}}>        
   {
         info.map((data) => (
              name = data.name,
              email = data.email,
              age = data.age,
              qual = data.qualification,
              field = data.field
            
         ))
              }</div>
            
           
         
      <br /> <hr/> <br />
                    
                                <div className="row">
                              <form className='search1_form mx-auto' action="" style={{}}>

                <h4 style={{textAlign:"center"}}>Faculty Data</h4>


                    <label for="uname" className='form-label'><b>Name</b></label>
                    <input className='search1_input form-control' type="text" name="uname" value={name} readOnly disabled />

                    <label for="email" className='form-label'><b>Email</b></label>
                    <input type="email" className='search1_input form-control'  name="email" value={email} readOnly disabled />
                    <label for="age" className='form-label'><b>Age</b></label>
                    <input className='search1_input form-control' type="number"  name="age" value={age} readOnly disabled />

                    <label for="field" className='form-label'><b>Field</b></label>
                    <input type="text" className='search1_input form-control'  readOnly disabled name="field" value={field} />
                    <label for="qual" className='form-label'><b>Qualification</b></label>
                    <input className='search1_input form-control' type="text"  name="qual"  value={qual} readOnly disabled />

                    <label for="role" className='form-label'><b>Role</b></label>
                    <input type="text" className='search1_input form-control'  name="role" readOnly disabled value={"faculty"} />
                    
                              </form></div>
                       
            </div>
        </div>
       

    )
}