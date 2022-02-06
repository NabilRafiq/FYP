import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import {Link} from "react-router-dom";
import '../../Coordinator/GetData/getdata.css';


export default function AAgetdata() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const history = useNavigate();

    window.addEventListener('load', () => {
        setLoading(true);
        Fetchdata();
        
    });
    
    const Fetchdata = () => {
        db.collection("coordinator").get().then((querySnapshot) => {


            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);

            });
            setLoading(false);
            setShow(true);
        })
        
    }
    const handleDelete = async (name) => {
        await db.collection("coordinator").where("email", "==", name).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();

                alert(" Faculty Data Deleted Successfully");



            })
        await db.collection("users").where("email", "==", name).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();

                alert("User Removed");



            })



            .catch((error) => {
                alert(error.message)
            })
        setTimeout(function () { window.location.reload() }, 3500);

    }
  

    return (
        <div>
            <Helmet>
                <title>Coordinator Data</title>
            </Helmet>

           

            {console.log(info)}
            <div style={{ marginTop: '70px',  }} className="container">
            <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Coordinator <i class="bi bi-clipboard-data"></i></h4>
               
      
               
               
                <table className='table table-striped' id='getData'>
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
                                <th scope='col'>Age</th>
                                <th scope='col'>Number</th>
                                <th scope='col'>Delete</th>
                            </tr>)
                        }
                })()  
            }  </thead>
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
                                        {data.age}

                                    </td>
                                    <td>
                                        {data.number}

                                    </td>
                                    <td scope='col'>
                                        <button className="btn btn-warning" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                    </td>
                                    {/* <th scope='col'>
                                      
                                        <button className="btn btn-primary" onClick={()=>handleUpdate(data)}><i class="bi bi-pencil-square"></i></button>

                                       
                                    </th> */}
                                </tr>
                            ))
                        } </tbody></table>
                <div className="btncenter" style={{ textAlign: "center" }}>
                    <button className="btn gd_button" onClick={() => {
                        history('/Admin', { replace: true })
                    }}>Back</button></div>
              
            </div>
   

        </div>
    )
}