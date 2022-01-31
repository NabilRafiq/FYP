import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {db} from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './annouce.css'




export default function Announce() {


    const history= useNavigate()

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

     const handleSubmit= (e)=>{
         e.preventDefault();
         db.collection('annoucement').add({
             title:title,
             detail:detail,
         })
         .then(()=>{
            alert("Annoucement made succuessfully")
         })
         .catch((error)=>{
             alert(error.message);
         })
         setTitle("");
         setDetail("");
    }




    return(



            <div>
        <Helmet>
                <title>Annoucements</title>
            </Helmet>

          



            <div className="a_container container-sm ">
                
            <form className='a_form' onSubmit={(e) => handleSubmit(e)}>

            <h3 style={{ textAlign: 'center', margin: '5px' }}>Annoucements</h3>
              
                    <label for="title" className='form-label'><b>Title</b></label>
                    <input className='a_input form-control' type="text" placeholder="Enter Title" name="title" required value={title} onChange={(e)=>setTitle(e.target.value)} />

                    <div class="form-floating">
  <textarea style={{width:"100%"}} rows="100" cols="100" class="form-control" placeholder="Give details" id="floatingTextarea" value={detail} onChange={(e)=>setDetail(e.target.value)}></textarea>
  <label for="floatingTextarea">Please write details of the annoucement</label>
</div>
                    <div style={{ textAlign: 'center' }}>

                        <button className="a_button btn" type="submit" id='lbutton'>Submit</button>
                      
                        <button className="col-2 a_button btn" style={{padding:'2px' , color: 'black', background: 'none' }} onClick={() => {
                            history('/admin', { replace: true })
                        }}>Back</button></div>
               

            </form>
            </div>
    </div>
)

}