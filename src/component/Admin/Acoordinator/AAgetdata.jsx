import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db, auth } from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import {Link} from "react-router-dom";
import './AAgetdata.css';


export default function AAgetdata() {


    const [info, setInfo] = useState([]);
    const history = useNavigate();

    window.addEventListener('load', () => {
        Fetchdata();
    });
    const Fetchdata = () => {
        db.collection("coordinator").get().then((querySnapshot) => {


            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);

            });
        })
    }
    const handleDelete = async (email) => {
        await db.collection("coordinator").where("email", "==", email).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
                
               alert(" Data Deleted Successfully");

            })

            .catch((error) => {
                alert(error.message)
            })

    }
  

    return (
        <div>
            <Helmet>
                <title>Coordinator Data</title>
            </Helmet>

           

            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
            <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Academic Coordinator Data</h3>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Field</th>
                            <th scope='col'>Delete</th>
                        </tr></thead>
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
                                    <th scope='col'>
                                        <button className="btn btn-danger" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                    </th>
                                    {/* <th scope='col'>
                                      
                                        <button className="btn btn-primary" onClick={()=>handleUpdate(data)}><i class="bi bi-pencil-square"></i></button>

                                       
                                    </th> */}
                                </tr>
                            ))
                        } </tbody></table>
                <div className="btncenter" style={{ textAlign: "center" }}>
                    <button className="btn adgd_button" onClick={() => {
                        history('/Admin', { replace: true })
                    }}>Back</button></div>
              
            </div>
   

        </div>
    )
}