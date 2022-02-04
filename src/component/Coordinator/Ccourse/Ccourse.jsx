import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './Ccourse.css'



export default function Ccouse() {
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


            <div className="container-sm cc_container">
                <form className='cc_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center' }}>Course Form</h3>

                    <label for="uname" className='cc_label form-label'><b>Course Name</b></label>
                    <input type="text" className='cc_input  form-control' placeholder="Enter Course Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />


                    <label for="hour" className='cc_label form-label'><b>Credit Hour</b></label>
                    <input type="number" min={1} max={4} className='cc_input form-control' placeholder="Enter Credit Hour" name="hour" value={hour} required onChange={(e) => setHour(e.target.value)} />
{/* 
                    <label for="depart" className='cc_label form-label' ><b>Program</b></label>
                    <input type="text" className='cc_input form-control' placeholder="Enter Program" name="depart" value={depart} required onChange={(e) => setDepart(e.target.value)} /> */}
                

                    <button id='cc_button' type="submit" className='cc_button btn'>Submit</button>
                    <button className='cc_button btn' style={{ color: 'black', backgroundColor: 'white' }}
                        onClick={() => {
                            history('/Dashboard', { replace: true })
                        }}>Back</button>



                </form>

            </div>
        </div>

    )
}