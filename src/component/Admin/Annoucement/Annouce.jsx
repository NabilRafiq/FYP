import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import '../../SignUp/SignUp.css'




export default function Announce() {


    const history = useNavigate()

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [faculty, setFaculty] = useState(false);
    const [coord, setCoord] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('annoucement').add({
            title: title,
            detail: detail,
            faculty:faculty,
            coordinator:coord
        
        })
            .then(() => {
                alert("Annoucement made succuessfully")
            })
            .catch((error) => {
                alert(error.message);
            })
        setTitle("");
        setDetail("");
    }




    return (



        <div>
            <Helmet>
                <title>Annoucements</title>
            </Helmet>





            <div className="s_container">

                <form className='s_form' onSubmit={(e) => handleSubmit(e)}>

                    <h3 style={{ textAlign: 'center', margin: '5px' }}>Annoucements</h3>

                    <label for="title" className='form-label'><b>Title</b></label>
                    <input className='s_input form-control' type="text" placeholder="Enter Title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />

                    <div class="form-floating">
                        <textarea style={{ width: "100%" }} rows="100" cols="100" class="form-control" placeholder="Give details" id="floatingTextarea" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                        <label for="floatingTextarea">Please write details of the annoucement</label>
                    </div>

                    <label className='f_label form-label'><b>Role</b></label><br />
                    <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox3" onChange={() => setFaculty((prevCheck) => !prevCheck)} value="faculty" />
                          <label className="form-check-label" htmlFor="inlineCheckbox3">Faculty</label>
                          {console.log(faculty)}
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox4" onChange={() => setCoord((prevCheck) => !prevCheck)} value="coordinator" />
                          <label className="form-check-label" htmlFor="inlineCheckbox4">Coordinator</label>
                        </div>

                    <div style={{ textAlign: 'center' }}>

                        <button className="s_button btn" type="submit" id='lbutton'>Submit</button>

                        <button className="col-2 s_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                            history('/admin', { replace: true })
                        }}>Back</button></div>


                </form>
            </div>
        </div>
    )

}