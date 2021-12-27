import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {db} from '../firebase';
import { Navigate, useNavigate } from 'react-router';
import './form.css'


export default function Form(){
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [age,setAge]=useState("");
   const [qualification,setQualification]=useState("");
   const [field,setField]=useState("");
   const history=useNavigate();
    const handleSubmit= (e)=>{
        e.preventDefault();
        db.collection('facultyform').add({
            name:name,
            email:email,
            age: age,
            qualification:qualification,
            field:field 

        })
        .then(()=>{
            alert('Data has been submitted')
        })
        .catch((error)=>{
            alert(error.message);
        })
        setName("");
        setEmail("");
        setAge("");
        setQualification("");
        setField("");
   }
    return(
       <div className='Form'>
         <Helmet>
        <title>Faculty Form</title>
      </Helmet>
      <h3 style={{textAlign:'center'}}>Faculty Form</h3>

<div className="container-sm f_container">
      <form className='f_form' onSubmit={(e)=>handleSubmit(e)}>



  <label for="uname" className='f_label form-label'><b>Name</b></label>
  <input type="text" className='f_input  form-control' placeholder="Enter Name" name="uname" required value={name} onChange={(e)=>setName(e.target.value)} />

  <label for="Email" className='f_label form-label'><b>Email</b></label>
  <input type="email" className='f_input form-control' placeholder="Enter Email" name="Email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
  <label for="age" className='f_label form-label'><b>Age</b></label>
  <input type="number" className='f_input form-control' placeholder="Enter Age" name="age" value={age} required onChange={(e)=>setAge(e.target.value)} />

  <label for="qual"className='f_label form-label' ><b>Qualification</b></label>
  <input type="text" className='f_input form-control' placeholder="Enter Qualification" name="qual" value={qualification} required onChange={(e)=>setQualification(e.target.value)}/>
  <label for="field" className='f_label form-label'><b>Field</b></label>
  <input type="text" className='f_input form-control' placeholder="Enter Field" name="field" value={field} required onChange={(e)=>setField(e.target.value)} />


      
  <button id='f_button' type="submit" className='f_button btn'>Submit</button>
  <button className='f_button btn' style={{color:'black',backgroundColor:'white'}}
  onClick={() => {
    history('/Dashboard', { replace: true })
}}>Back</button>



</form>
</div>
</div>   
       
    )
}