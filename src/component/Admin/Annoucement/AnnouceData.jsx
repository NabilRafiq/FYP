import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import '../../../component/Coordinator/GetData/getdata.css';


export default function AnnouceData() {


    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [model, setModel] = useState(false);
    const [stext, setStext] = useState("");
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");
    const [role, setRole] = useState("");
    const [search, setSearch] = useState([]);
    const [user, setUser] = useState("");
    const history = useNavigate();
    let docid = "1";

    useEffect(() => {

        firebase.auth.onAuthStateChanged(user => {
            if (user) setUser(user.email)
            else setUser(null)
          })
        Fetchdata(user);
    }, []);


    const Fetchdata = async () => {


        await firebase.db.collection("annoucement").get()
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
            await firebase.db.collection("annoucement").where("title", "==", name).get()
                .then(querySnapshot => {
                    querySnapshot.docs[0].ref.delete();

                    alert("Announcement Deleted Successfully");



                })
                .catch((error) => {
                    alert(error.message)
                })
            setTimeout(function () { window.location.reload() }, 3500);
        }

    }
    const handleUpdate = async (name) => {

        await firebase.db.collection("annoucement").where("title", "==", name).get()
            .then(querySnapshot => {

                querySnapshot.forEach(element => {
                    docid = element.id;


                })


            });

        var washingtonRef = firebase.db.collection("annoucement").doc(docid);


        await washingtonRef.update({
            title: name,
            detail: detail,
            role: role

        })
            .then(function () {
                alert("Announcement updated successfully")
                setTimeout(function () { window.location.reload() }, 1500);
            })
            .catch(function (error) {
                alert(error.message)
                setTimeout(function () { window.location.reload() }, 1500);
            })

    }





    const handleUser = async (e) => {
        history('/Admin', { replace: true })
    }

    const handleSubmit = async (e) => {

        if (stext != "") {
            e.preventDefault();
            setShow(false);
            setShow1(false); 
            setLoading(true);





            await firebase.db.collection("annoucement").where("title", "==", stext).get().then((querySnapshot) => {

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
                    alert("Data Doesn't Exist");



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
        setName(data.title);
        setDetail(data.detail);
        setRole(data.role)
        setModel(true);

    }


    const handleClose = () => setModel(false);

    return (
        <div>
            <Helmet>
                <title>Announcement Data</title>
            </Helmet>



            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
                <div className="row">
                    <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Announcements<i class="bi bi-clipboard-data"></i></h4>
                </div>
                <div className="row srow d-flex justify-content-end">
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <input class="form-control me-2 search_input" type="text" placeholder="Search Announcements"
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
                                            <th scope='col'>Title</th>
                                            <th scope='col'>Details</th>
                                            <th scope='col'>Role</th>
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
                                                {data.title}
                                            </td>
                                            <td>
                                                {data.detail}
                                            </td>
                                            <td>
                                                {data.role}
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
                                                            <h3 style={{ textAlign: 'center', margin: '5px' }}>Annoucements</h3>

                                                            <label for="title" className='form-label'><b>Title</b></label>
                                                            <input className='s_input form-control' type="text" placeholder="Enter Title" name="title" required value={name} onChange={(e) => setName(e.target.value)} />

                                                            <div class="form-floating">
                                                                <textarea style={{ width: "100%" }} rows="100" cols="100" class="form-control" id="floatingTextarea" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                                                            </div>

                                                            <label className='f_label form-label'><b>Role</b></label><br />

                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"></label>
                                                                <select onChange={(e) => setRole(e.target.value)} value={role} class="form-select" id="inputGroupSelect01">
                                                                    <option value="faculty">Faculty</option>
                                                                    <option value="coordinator">Coordinator</option>
                                                                    <option value="all" selected>All</option>
                                                                </select>
                                                            </div>

                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { handleUpdate(name) }}>Save Changes</button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </td>
                                            <td scope='col'>
                                                <button className="btn btn-warning" onClick={() => { handleDelete(data.title) }}><i class="bi bi-trash"></i></button>
                                            </td>

                                        </tr>
                                    )))

                                if (show1 && !show && !loading)
                                    console.log(search)
                                return (
                                    search.map((data) => (

                                        <tr>

                                            <td>
                                                {data.title}
                                            </td>
                                            <td>
                                                {data.detail}
                                            </td>
                                            <td>
                                                {data.role}
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

                                                            <h3 style={{ textAlign: 'center', margin: '5px' }}>Annoucements</h3>

                                                            <label for="title" className='form-label'><b>Title</b></label>
                                                            <input className='s_input form-control' type="text" placeholder="Enter Title" name="title" required value={name} onChange={(e) => setName(e.target.value)} />

                                                            <div class="form-floating">
                                                                <textarea style={{ width: "100%" }} rows="100" cols="100" class="form-control" id="floatingTextarea" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                                                            </div>

                                                            <label className='f_label form-label'><b>Role</b></label><br />

                                                            <div class="input-group mb-3">
                                                                <label class="input-group-text" for="inputGroupSelect01"></label>
                                                                <select onChange={(e) => setRole(e.target.value)} value={role} class="form-select" id="inputGroupSelect01">
                                                                    <option value="faculty">Faculty</option>
                                                                    <option value="coordinator">Coordinator</option>
                                                                    <option value="all" selected>All</option>
                                                                </select>
                                                            </div>
                                                        </form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <button className="btn btn-primary" onClick={() => { handleUpdate(data.title) }}>Save Changes</button>
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
