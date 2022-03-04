import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import './getdata.css';


export default function GetData() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [stext, setStext] = useState();
    const [search, setSearch] = useState([]);
    const history = useNavigate();


    useEffect(() => {

        setLoading(true);
        Fetchdata();
    }, []);


    const Fetchdata = async () => {
        setShow1(false);
        setShow(true);
        
        await firebase.db.collection("facultyform").get()
            .then((querySnapshot) => {


                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);

                });
                setLoading(false);
              
            })

    }
    const handleDelete = async (name) => {

        const confirmBox = window.confirm("Do you want to delete this data?");

        if (confirmBox == true) {
            await firebase.db.collection("facultyform").where("email", "==", name).get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete();

                    alert(" Faculty Data Deleted Successfully");



                })



            await firebase.db.collection("users").where("email", "==", name).get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete();

                    alert("User Removed");



                })




                .catch((error) => {
                    alert(error.message)
                })
            setTimeout(function () { window.location.reload() }, 3500);
        }

    }


    const handleUser = async (e) => {
        const user = firebase.auth.currentUser;
        await firebase.db.collection("users").where("email", "==", user.email).get().then(querySnapshot => {
            querySnapshot.forEach(element => {
                var data = element.data();
                if (data.role === "admin") {
                    history('/Admin', { replace: true })
                }
                else if (data.role === "coordinator") {
                    history('/Dashboard', { replace: true })
                }


            })
        });
    }

    const handleSubmit = async (e) => {
        setShow(false);
        setShow1(false);
        setLoading(true);
        e.preventDefault();
       
      

        await firebase.db.collection("facultyform").where("name", "==", stext).get().then((querySnapshot) => {

            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var data = element.data();
                    setSearch(arr => [...arr, data]);


                });
                setLoading(false);
                
                setShow1(true);
            }
            else {
                setLoading(false);
                setShow1(false);
                setShow(true);
                alert("Profile Doesn't Exist");
              
                

            }

        })
            .catch((error) => {
                setShow1(false);
                setShow(true);
                alert(error.message);
               
                

            })

    }


    return (
        <div>
            <Helmet>
                <title>Faculty Data</title>
            </Helmet>



            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
<div className="row">
                <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Faculty<i class="bi bi-clipboard-data"></i></h4>
                </div>
                <div className="row srow d-flex justify-content-end">
        <form onSubmit={(e) => handleSubmit(e)}>

                    <input class="form-control me-2 search_input" type="text" placeholder="Search Faculty Data"
                        onChange={(e) => setStext(e.target.value)} aria-label="Search"/>


                    <button class="btn" id='search_btn' type="submit" ><i class="fas fa-search"></i></button>
                    </form>
                </div>

                <div className="container-fluid">

                    <table className='table table-striped' id='getData'>
                        <thead>

                            {
                                (() => {
                                    if ( loading)
                                        return (<div class="text-center" style={{ margin: "10px" }}>
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div></div>)

                                    else
                                        return (
                                            <tr>
                                                <th scope='col'>Name</th>
                                                <th scope='col'>Age</th>
                                                <th scope='col'>Email</th>
                                                <th scope='col'>Field</th>
                                                <th scope='col'>Qualification</th>
                                                <th scope='col'>Update</th>
                                                <th scope='col'>Delete</th>
                                            </tr>
                                        )
                                })()
                            }</thead>
                        <tbody>

                            {
                                (() => {
                                    if (show && !show1)
                                        return (info.map((data) => (

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
                                                <td>
                                                    {data.field}

                                                </td>
                                                <td>
                                                    {data.qualification}

                                                </td>
                                                {/* <td scope='col'>
                                                    <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                                </td> */}
                                                <td scope='col'>
                                                    <button className="btn btn-warning" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                                </td>
                     
                                            </tr>
                                        )))

                                    if (show1 && !show)
                                    console.log(search)
                                        return (
                                            search.map((data) => (

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
                                                    <td>
                                                        {data.field}

                                                    </td>
                                                    <td>
                                                        {data.qualification}

                                                    </td>
                                                    {/* <td scope='col'>
                                                        <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                                    </td> */}
                                                    <td scope='col'>
                                                        <button className="btn btn-warning" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                                    </td>
  
                                                </tr>
                                            ))
                                        )
                                })()
                            }</tbody>



                    </table>
                </div>

            </div></div>)
}
