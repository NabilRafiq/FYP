import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { Navigate, useNavigate } from 'react-router';
import './getdata.css';


export default function GetData() {


    const [info, setInfo] = useState([]);
    const history = useNavigate();

    window.addEventListener('load', () => {
        Fetchdata();
    });
    const Fetchdata = () => {
        db.collection("facultyform").get().then((querySnapshot) => {


            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);

            });
        })
    }
    const handleDelete = async (name) => {
        await db.collection("facultyform").where("name", "==", name).get()
            .then(querySnapshot => {
                querySnapshot.docs[0].ref.delete();
                alert("Data deleted successfully");


            })



            .catch((error) => {
                alert(error.message)
            })


    }

    function reload1() {
        window.location.reload();
    }



    return (
        <div>
            <Helmet>
                <title>Faculty Data</title>
            </Helmet>

            <h3 style={{ textAlign: 'center' }}>Faculty Data</h3>

            {console.log(info)}
            <div style={{ marginTop: '100px' }} className="container">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Email</th>
                        </tr></thead>
                    <tbody>
                        {


                            info.map((data) => (
                                <tr>

                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.age}
                                    </td>
                                    <td>
                                        {data.email}

                                    </td>
                                    <th scope='col'>
                                        <button className="btn btn-danger" onClick={() => { handleDelete(data.name) }}><i class="bi bi-trash"></i></button>
                                    </th>
                                    <th scope='col'>
                                        <button className="btn btn-primary" /*onClick={() => { handleDelete(data.name) }}*/><i class="bi bi-pencil-square"></i></button>
                                    </th>
                                </tr>
                            ))
                        } </tbody></table>
                <div className="btncenter" style={{ textAlign: "center" }}>
                    <button className="btn gd_button" onClick={() => {
                        history('/Dashboard', { replace: true })
                    }}>Back</button></div>
            </div>

        </div>
    )
}