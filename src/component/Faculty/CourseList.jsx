import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { useNavigate } from 'react-router';
import '../Coordinator/GetData/getdata.css'


export default function CourseList() {


    useEffect(() => {

        Fetchdata();
    }, []);


    const [loading,setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const Fetchdata = async () => {


        await firebase.db.collection("course").get()
            .then((querySnapshot) => {


                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);


                });
                setLoading(false);
                setShow(true);
            })

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
                            onChange={(e) => setStext(e.target.value)} aria-label="Search" />


                        <button class="btn" id='search_btn' type="submit" ><i class="fas fa-search"></i></button>
                    </form>
                </div></div>


            <div className="container" style={{ overflowX: "auto" }}>


                <table className='table table-striped' id='getData'>
                    <thead>

                        {
                            (() => {
                                if (loading && !show && !show1)
                                    return (<div class="text-center" style={{ margin: "10px" }}>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div></div>)

                                else
                                    return (

                                        <tr>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>CRHS</th>
                                            <th scope='col'>FacultyEmail</th>
                                            <th scope='col'>Field</th>
                                            <th scope='col'>Qualification</th>
                                        </tr>
                                    )
                            })()
                        }</thead>
                    <tbody>

                        {
                            (() => {
                                if (show && !loading)

                                    return (info.map((data) => (

                                        <tr>

                                            <td>
                                                {data.name}
                                            </td>
                                            <td>
                                                {data.hour}
                                            </td>
                                            <td>
                                                {data.faculty}
                                            </td>
                                            <td>
                                                {data.field}

                                            </td>
                                            <td>
                                                {data.qualification}

                                            </td>
                                   
                               
                                      

                                        </tr>
                                    )))

                
                            })()
                        }</tbody>



                </table></div>
            <div className="d-flex justify-content-center">
                <button id='search_btn' style={{ width: "15%" }} className='search_btn btn'
                    onClick={
                        (e) => { handleUser(e) }
                    }>Back</button></div>

        </div>)

}