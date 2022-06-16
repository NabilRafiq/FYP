import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { useNavigate } from 'react-router';
import '../Coordinator/GetData/getdata.css'
import { Button, Modal } from 'react-bootstrap';

export default function CourseList() {

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [user1, setUser1] = useState(null);
    const [reason, setReason] = useState("");
    const [model, setModel] = useState(false);
    const [found, setFound] = useState(false);
    const [info, setInfo] = useState([]);   
    const history = useNavigate();
    useEffect( () => {
        firebase.auth.onAuthStateChanged(user => {
            if (user) setUser1(user)
            else setUser1(null)
          })  
         console.log(user1.email)
    },[]);

   

    const Fetchdata = async () => {

        try {
        await firebase.db.collection("course").where("faculty", "==",user1).get()
            .then((querySnapshot) => {

                
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
                    

                });
                setLoading(false);
                setShow(true);
            })
        } 
        catch (err) {
            alert(err.message);
          }
    }

    const handleClose = () => setModel(false);

    const handleSubmit = async (data) => {  
        const course = data.name;
        const faculty= data.faculty;
        const field= data.field;
        const CHRS=data.hour;


        firebase.db.collection('deregistration').add({
            course: course,
            faculty: faculty,
            field: field,
            CHRS:CHRS,
            reason:reason
        })
            .then(() => {
                alert("Request made succuessfully")
            })
            .catch((error) => {
                alert(error.message);
            })
        setReason("");
    }

    return (
        <div>
            <Helmet>
                <title>Course Data</title>
            </Helmet>



            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
                <div className="row">
                    <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Course<i class="bi bi-clipboard-data"></i></h4>
                </div>
               </div>


            <div className="container" style={{ overflowX: "auto" }}>


                <table className='table table-striped' id='getData'>
                    <thead>

                        {
                            (() => {
                                if (loading && !show )
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
                                            <th scope='col'>Deregister</th>
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
                                            <td scope='col'>
                                                <button className="btn btn-success" onClick={setModel(true)}><i class="bi bi-slash-circle"></i></button>

                                                <Modal
                                                    show={model}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Deregister Course</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className='f_form' >

                                                            <div class="form-group">
                                                                <label for="exampleFormControlTextarea1">Reason for Deregistration</label>
                                                                <textarea class="form-control" id="exampleFormControlTextarea1" onChange={(e) => setReason(e.target.value)} rows="3"></textarea>
                                                            </div>


                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { handleSubmit(data) }}>Submit</button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </td>



                                        </tr>
                                    )))


                            })()
                        }</tbody>



                </table></div>
            <div className="d-flex justify-content-center">
                <button className="col-2 s_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                    history('/faculty', { replace: true })
                }}>Back</button></div>

        </div>)

}