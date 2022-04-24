import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import '../../SignUp/SignUp.css'




export default function Announce() {


    const history = useNavigate()

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('annoucement').add({
            title: title,
            detail: detail,
            role: role
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
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-school'></i></label>
                        <select onChange={(e) => setRole(e.target.value)} class="form-select" name='form-select1' id="inputGroupSelect01">
                            <option value="faculty">faculty</option>
                            <option value="coordinator">coordinator</option>
                            <option value="both">both</option>
                        </select>
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