import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import './../Search.css'



export default function Acsearch() {

    const history = useNavigate();
    const [stext, setStext] = useState('');
    const [info, setInfo] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);

        await db.collection("coordinator").where("name", "==", stext).get().then((querySnapshot) => {

            if (!querySnapshot.empty) {
              
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);


                });
                setShow(true);
                setLoading(false);
            }
            else {

                alert("Profile Doesn't Exist");
setLoading(false);
            }

        })
            .catch((error) => {

                alert(error.message);

            })

    }


    return (
        <div className='Search'>
            <Helmet>
                <title>Search Coordinator</title>
            </Helmet>


            <div className="container-sm search_container" style={{ textAlign: "center" }}>
                <div className="row">
                    <form className='search_form' onSubmit={(e) => handleSubmit(e)}>

                        <h4 style={{ textAlign: 'center' }}>Search Coordinator Data</h4>

                        <input class="form-control me-2 search_input" type="text" placeholder="Search Faculty Data"
                            onChange={(e) => setStext(e.target.value)} aria-label="Search" required />


                        <button class="btn btn-outline-success search_btn" type="submit"><i class="bi bi-search"></i></button>

                    </form> </div>
                <button id='search_btn' style={{ width: "15%" }} className='search_btn btn'
                    onClick={() => {
                        history('/Admin', { replace: true })
                    }}>Back</button>

            </div>

            <br /> <hr /> <br />
            <div className="container">



                <h4 style={{ textAlign: "center", marginTop: "-10px" }}>Coordinator Data</h4>


                <table  style={{ marginTop: "30px" }} className='table table-striped'>
                    <thead>
                    {
                (() => {
                    if(!show&&loading) {
                       
                            return (
                                <div class="text-center" style={{margin:"10px"}}>
                                <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div></div>
                             
                        
                            )
                            setShow(false);
                            
                        } 
                        else if (show){
                            return(   <tr>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Field</th>
                            </tr>)
                        }
                })()  
            }  
                      </thead>
                    <tbody>

                        {


                            info.map((data) => (
                                <tr>

                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.email}
                                    </td>
                                    <td>
                                        {data.field}

                                    </td>

                                    {/* <th scope='col'>
                                      
                                        <button className="btn btn-primary" onClick={()=>handleUpdate(data)}><i class="bi bi-pencil-square"></i></button>

                                       
                                    </th> */}
                                </tr>
                            ))
                        } </tbody></table>

            </div>
        </div>


    )
}