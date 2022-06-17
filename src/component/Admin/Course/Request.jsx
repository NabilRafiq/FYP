import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import '../../Coordinator/GetData/getdata.css';


export default function Request() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [model, setModel] = useState(false);
    const [name, setName] = useState("");
    const [hour, setHour] = useState(1);
    const [email, setEmail] = useState("");
    const [qualification, setQual] = useState("");
    const [field, setField] = useState("");
    const history = useNavigate();
    let docid = "1";
    let docid1 = "1";


    useEffect(() => {

        Fetchdata();
    }, []);


    const Fetchdata = async () => {


        await firebase.db.collection("facultyform").get()
            .then((querySnapshot) => {

                if (querySnapshot.empty) {
                    setLoading(false);
                    setShow(false);
                }
                else {
                    querySnapshot.forEach(element => {
                        var data = element.data();
                        setInfo(arr => [...arr, data]);
                        setLoading(false);
                        setShow(true);

                    });
                }

            })

    }


    const Update = (data) => {

        setEmail(data.email);
        setField(data.field);
        setQual(data.qualification);
        setModel(true);

    }
    const HandleRequest = async (faculty) => {

        const confirmBox = window.confirm("Do you want to request this faculty?");
        if (confirmBox) {
            await firebase.db.collection('request').add({
                name: name,
                CHRS: hour,
                qualification: qualification,
                field: field,
                faculty: faculty
            })
                .then(() => {
                    alert("Request made Successfully");
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    }


    const handleClose = () => setModel(false);

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
            </div>


            <div className="container" style={{ overflowX: "auto" }}>


                <table className='table table-striped' id='getData'>
                    <thead>

                        {
                            (() => {
                                if (loading && !show)
                                    return (<div class="text-center" style={{ margin: "10px" }}>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div></div>)

                                else
                                    return (

                                        <tr>
                                            <th scope='col'>Name</th>
                                            <th scope='col'>Date of Birth</th>
                                            <th scope='col'>Email</th>
                                            <th scope='col'>Field</th>
                                            <th scope='col'>Qualification</th>
                                            <th scope='col'>Course1</th>
                                            <th scope='col'>Course2</th>
                                            <th scope='col'>Course3</th>
                                            <th scope='col'>Request</th>
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

                                            <td>
                                                {data.course1}

                                            </td>
                                            <td>
                                                {data.course2}

                                            </td>
                                            <td>
                                                {data.course3}

                                            </td>

                                            <td scope='col'>
                                                <button className="btn btn-success" onClick={() => { Update(data) }}><i class="bi bi-pencil-square"></i></button>

                                                <Modal
                                                    show={model}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Course Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className='f_form' >



                                                            <label for="uname" className='cf_label form-label '><b>Course Name</b></label>
                                                            <input type="text" className='cf_input  form-control inp inp-brd' placeholder="Enter Course Name" name="uname" required value={name} onChange={(e) => setName(e.target.value)} />

                                                            <div class="input-group mb-3 inp">
                                                                <label class="input-group-text" for="inputGroupSelect01"><b>Credit Hour</b></label>
                                                                <select onChange={(e) => setHour(e.target.value)} value={hour} class="form-select" id="inputGroupSelect01">
                                                                    <option value={1}>1</option>
                                                                    <option value={2}>2</option>
                                                                    <option value={3}>3</option>
                                                                    <option value={4}>4</option>
                                                                </select>
                                                            </div>

                                                            <div class="input-group mb-3 inp">
                                                                <label class="input-group-text" for="inputGroupSelect01"><b>Field</b></label>
                                                                {console.log(data.field)}
                                                                <select onChange={(e) => setField(e.target.value)} value={field} class="form-select" id="inputGroupSelect01">
                                                                    <option value="ComputerScience">ComputerScience</option>
                                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                                    <option value="MediaScience">MediaScience</option>
                                                                    <option value="Buisness Adminstration">Buisness Adminstration</option>
                                                                </select>
                                                            </div>
                                                            <div class="input-group mb-3 inp">
                                                                <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                                                                <select onChange={(e) => setQual(e.target.value)} value={qualification} class="form-select" name='form-select1' id="inputGroupSelect01">
                                                                    <option value="Bachelors">Bachelors</option>
                                                                    <option value="Master">Master</option>
                                                                    <option value="Mphil">Mphil</option>
                                                                    <option value="PHD">PHD</option>
                                                                </select>
                                                            </div>  </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { HandleRequest(email) }}>Request Course</button>
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
                    history('/admin', { replace: true })
                }}>Back</button></div>

        </div>)
}
