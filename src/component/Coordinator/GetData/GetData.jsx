import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import './getdata.css';


export default function GetData() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [model, setModel] = useState(false);
    const [stext, setStext] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [qualification, setQualification] = useState("");
    const [field, setField] = useState("");
    const [search, setSearch] = useState([]);
    const history = useNavigate();
    let docid = "1";
    let docid1 = "1";


    useEffect(() => {

        Fetchdata();
    }, []);


    const Fetchdata = async () => {


        await firebase.db.collection("facultyform").get()
            .then((querySnapshot) => {


                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);


                });
                setLoading(false);
                setShow(true);
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
    const handleUpdate = async (email) => {



        await firebase.db.collection("facultyform").where("email", "==", email).get()
            .then(querySnapshot => {

                querySnapshot.forEach(element => {
                    docid = element.id;


                })




            });


        await firebase.db.collection("users").where("email", "==", email).get()
            .then(querySnapshot => {

                querySnapshot.forEach(element => {
                    docid1 = element.id;


                })
            });
        var washingtonRef = firebase.db.collection("facultyform").doc(docid);
        var washingtonRef1 = firebase.db.collection("users").doc(docid1);


        await washingtonRef.update({
            name: name,
            age: age,
            qualification: qualification,
            field: field

        })
        return washingtonRef1.update({
            name: name,
            age: age,
            qualification: qualification,
            field: field
        })
            .then(function () {
                alert("Data updated successfully")
                setTimeout(function () { window.location.reload() }, 1500);
            })
            .catch(function (error) {
                alert(error.message)
                setTimeout(function () { window.location.reload() }, 1500);
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

    const handleSubmit = async (e) => {

        if (stext != "") {
            e.preventDefault();
            setShow(false);
            setShow1(false);
            setLoading(true);





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
                    setLoading(false)
                    setShow1(false);
                    setShow(true);
                    alert(error.message);



                })

        }

    }

    const Update = (data) => {

        console.log("tapped")
        setAge(data.age);
        setName(data.name);
        setField(data.field);
        setQualification(data.qualification)
        setEmail(data.email);
        setModel(true);

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
                                if (show && !show1 && !loading)

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
                                                <button className="btn btn-success" onClick={() => { Update(data) }}><i class="bi bi-pencil-square"></i></button>

                                                <Modal
                                                    show={model}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Update Data</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className='f_form' >



                                                            <label for="uname" className='f_label form-label'><b>Name</b></label>
                                                            <input type="text" className='f_input  form-control' placeholder={name} name="uname" onChange={(e) => setName(e.target.value)} />


                                                            <label for="age" className='f_label form-label'><b>Date of Birth</b></label>
                                                            <input type="date" className="s_input form-control" max="1997-12-31" name="age" required onChange={(e) => setAge(e.target.value)} />

                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                                                                <select onChange={(e) => setQualification(e.target.value)} value={qualification} class="form-select" name='form-select1' id="inputGroupSelect01">
                                                                    <option value="Bachelors">Bachelors</option>
                                                                    <option value="Master">Master</option>
                                                                    <option value="Mphil">Mphil</option>
                                                                    <option value="PHD">PHD</option>
                                                                </select>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-school'></i></label>
                                                                <select onChange={(e) => setField(e.target.value)} value={field} class="form-select" name='form-select1' id="inputGroupSelect01">
                                                                    <option value="ComputerScience">ComputerScience</option>
                                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                                    <option value="MediaScience">MediaScience</option>
                                                                    <option value="Buisness Adminstration">Buisness Adminstration</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { handleUpdate(email) }}>Save Changes</button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </td>
                                            <td scope='col'>
                                                <button className="btn btn-warning" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                            </td>

                                        </tr>
                                    )))

                                if (show1 && !show && !loading)
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
                                            <td>
                                                <button className="btn btn-success" onClick={() => { Update(data) }}><i class="bi bi-pencil-square"></i></button>

                                                <Modal
                                                    show={model}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Update Data</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <form className='f_form' >



                                                            <label for="uname" className='f_label form-label'><b>Name</b></label>
                                                            <input type="text" className='f_input  form-control' placeholder={name} name="uname" onChange={(e) => setName(e.target.value)} />


                                                            <label for="age" className='f_label form-label'><b>Date of Birth</b></label>
                                                            <input type="date" className="s_input form-control" max="1997-12-31" name="age" required onChange={(e) => setAge(e.target.value)} />

                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-graduation-cap'></i></label>
                                                                <select onChange={(e) => setQualification(e.target.value)} value={qualification} class="form-select" name='form-select1' id="inputGroupSelect01">
                                                                    <option value="Bachelors">Bachelors</option>
                                                                    <option value="Master">Master</option>
                                                                    <option value="Mphil">Mphil</option>
                                                                    <option value="PHD">PHD</option>
                                                                </select>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"><i class='fas fa-school'></i></label>
                                                                <select onChange={(e) => setField(e.target.value)} value={field} class="form-select" name='form-select1' id="inputGroupSelect01">
                                                                    <option value="ComputerScience">ComputerScience</option>
                                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                                    <option value="MediaScience">MediaScience</option>
                                                                    <option value="Buisness Adminstration">Buisness Adminstration</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { handleUpdate(email) }}>Save Changes</button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </td>
                                            <td scope='col'>
                                                <button className="btn btn-warning" onClick={() => { handleDelete(data.email) }}><i class="bi bi-trash"></i></button>
                                            </td>

                                        </tr>
                                    ))
                                )
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
