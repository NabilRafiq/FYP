import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './Cform.css'



export default function Cform() {
    const [name, setName] = useState("");
    const [hour, setHour] = useState("");
    // const [depart, setDepart] = useState("");
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
     
        await db.collection('course').add({
            name: name,
            hour: hour,
            // depart : depart

        })
            .then(() => {
            
                alert("Course data added successfully")
            })
            .catch((error) => {
                alert(error.message);
            })
        setName("");
        setHour("");
        // setDepart("");

    }
    return (
        <div className='Form'>
            <Helmet>
                <title>Course Form</title>
            </Helmet>


            <div className="container-sm cf_container">
                <form className='cf_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}>Course Form</h3>

                    <label for="uname" className='cf_label form-label'><b>Course Name</b></label>
                    <input type="text" className='cf_input  form-control' placeholder="Enter Course Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />


                    <label for="hour" className='cf_label form-label'><b>Credit Hour</b></label>
                    <input type="number" min={1} max={4} className='cf_input form-control' placeholder="Enter Credit Hour" name="hour" value={hour} required onChange={(e) => setHour(e.target.value)} />
{/* 
                    <label for="depart" className='cf_label form-label' ><b>Program</b></label>
                    <input type="text" className='cf_input form-control' placeholder="Enter Program" name="depart" value={depart} required onChange={(e) => setDepart(e.target.value)} /> */}
                

                    <button id='cf_button' type="submit" className='cf_button btn'>Submit</button>
                    <button className='cf_button btn' style={{ color: 'black', backgroundColor: 'white' }}
                        onClick={() => {
                            history('/Admin', { replace: true })
                        }}>Back</button>



                </form>

            </div>
        </div>

    )
}