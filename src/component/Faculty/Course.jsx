import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import '../Coordinator/GetData/getdata.css';


export default function Course() {


    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState(0);
    const [course1, setCourse1] = useState("");
    const user = firebase.auth.currentUser;
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [err, setErr] = useState(false);
    const history = useNavigate()
    // const [show1, setShow1] = useState(false);
    // const [model, setModel] = useState(false);
    // const [stext, setStext] = useState("");
    // const [name, setName] = useState("");
    // const [age, setAge] = useState("");
    // const [email, setEmail] = useState("");
    // const [qualification, setQualification] = useState("");
    // const [field, setField] = useState("");
    // const [search, setSearch] = useState([]);
    // const history = useNavigate();
     let docid = "1";
    let docid1 = "1";



    useEffect(() => {
        setLoading(true);

        setErr(false);
        setShow(false)

        Fetchdata();

    }, []);


    const Fetchdata = async () => {
        await firebase.db.collection("course").get().then((querySnapshot) => {
        
            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var dete = element.data();
const user = firebase.auth.currentUser;
 firebase.db.collection("facultyform").where("email", "==", user.email).get().then((querySnapshot) => {

    querySnapshot.forEach(element => {
        var dete1 = element.data();
           
      
        if (dete1.field === dete.field && dete1.qualification === dete.qualification && dete.faculty == "" ){
            
            setInfo(arr => [...arr, dete]);
            setLoading(false);
            setErr(false);
            setShow(true);
            setInfo1(1);
          
        }
      
        
   })  
   if(info1 == 0){
    setLoading(false);
    setErr(true);
    setShow(false);
   } 
})
                });
            
            }
            else {
                setLoading(false);
            setErr(true);
            setShow(false);
            }

        })
            .catch((error) => {
                alert(error.message);

            })

    }

    const handleRegister = async (course) => {

        await firebase.db.collection("course").where("name", "==", course).get()
            .then(querySnapshot => {

                querySnapshot.forEach(element => {
                    docid = element.id;


                })})
                await firebase.db.collection("facultyform").where("email", "==", user.email).get()
                .then(querySnapshot => {
    
                    querySnapshot.forEach(element => {
                        docid1 = element.id;
    
    
                    })




            });
        var washingtonRef = firebase.db.collection("course").doc(docid);
        var washingtonRef1 = firebase.db.collection("facultyform").doc(docid1);
        await washingtonRef.update({
            faculty: user.email
        })
            .then(function () {
                alert("Data updated successfully")

            })
            .catch(function (error) {
                alert(error.message)

            })
            await washingtonRef1.update({
                [course1]: course
            })
                .then(function () {

                    alert("Data updated successfully")
    
                })
                .catch(function (error) {
                    alert(error.message)
    
                })
    }
   



    return (
        <div>
            <Helmet>
                <title>Course Registration</title>
            </Helmet>




            <div style={{ marginTop: '70px' }} className="container">
                <div className="row">
                    <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Course Registration</h4>
                </div>
            </div>
           

            {
                (() => {
                    if (show && !loading && !err || info1 == 1)
                        return (
                            <div className="container" style={{ overflowX: "auto" }}>



                                <table className='table table-striped' id='getData'>
                                    <thead>






                                        <tr>
                                            <th scope='col'>Title</th>
                                            <th scope='col'>Chrs</th>
                                            <th scope='col'>Field</th>
                                            <th scope='col'>Qualification</th>
                                            <th scope='col'>Register</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {info.map((data) => (

                                            <tr>

                                                <td>
                                                    {data.name}
                                                </td>
                                                <td>
                                                    {data.hour}
                                                </td>
                                                <td>
                                                    {data.field}

                                                </td>
                                                <td>
                                                    {data.qualification}

                                                </td>
                                                <td>

                                                    <button className="btn btn-success" onClick={() => { handleRegister(data.name) }}><i class="bi bi-check2-circle"></i></button>
                                                </td>
                                                {/* <td scope='col'>
                                                <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                            </td> */}



                                            </tr>
                                        ))



                                        }</tbody>



                                </table>



                            </div>)
                    if ( err && !loading && !show &&info1 !=1)
                        return (
                            <div className="d-flex justify-content-center">
                                <div class="alert alert-danger" role="alert">
                                    No Course available at this moment please check back later!
                                </div></div>)

                    if (!show && !err && loading)

                        return (
                            <div className="d-flex justify-content-center">
                                <div class="spinner-border text-dark" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div></div>)

                })()}
            <div className="d-flex justify-content-center">
                <button className="col-2 a_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                    history('/faculty', { replace: true })
                }}>Back</button></div></div>

    )
}
