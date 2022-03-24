import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import * as firebase from '../../firebase';
import { useNavigate } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import '../Coordinator/GetData/getdata.css';


export default function Course() {


    const [info, setInfo] = useState([]);
    const [info1, setInfo1] = useState([]);

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [nul, setNull] = useState(false);
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
    // let docid = "1";
    // let docid1 = "1";


    useEffect(() => {
        setLoading(true);
        Fetchdata();

    }, []);

  
    const Fetchdata = async () => {
        await firebase.db.collection("course").get().then((querySnapshot) => {
        
            if (!querySnapshot.empty) {

                querySnapshot.forEach(element => {
                    var dete = element.data();
const user = firebase.auth.currentUser;
 firebase.db.collection("users").where("email", "==", user.email).get().then((querySnapshot) => {

    querySnapshot.forEach(element => {
        var dete1 = element.data();
        console.log(dete.field + " "+dete.qualification + " "+dete1.field + " "+dete1.qualification + " ")
        if (dete1.field == dete.field && dete1.qualification == dete.qualification ){
            setInfo(arr => [...arr, dete]);
        }
        else{
            setInfo([])
            alert("No course found")
        }
   })   
})

                 



                });
                setShow(true);
                setLoading(false);
            }
            else {
                alert("No Course for you!");
                setLoading(false);

            }

        })
            .catch((error) => {
                alert(error.message);

            })

    }



    return (
        <div>
            <Helmet>
                <title>Course Registration</title>
            </Helmet>



            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
                <div className="row">
                    <h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Course Registration</h4>
                </div>
            </div>


            <div className="container" style={{ overflowX: "auto" }}>

            

                    <table className='table table-striped' id='getData'>
                        <thead>






                            <tr>
                                <th scope='col'>Title</th>
                                <th scope='col'>Chrs</th>
                                <th scope='col'>Field</th>
                                <th scope='col'>Qualification</th>
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
                                    {/* <td scope='col'>
                                                <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                            </td> */}



                                </tr>
                            ))



                            }</tbody>



                    </table>



               </div>
            <div className="d-flex justify-content-center">
                <button className="col-2 a_button btn" style={{ padding: '2px', color: 'black', background: 'none' }} onClick={() => {
                    history('/admin', { replace: true })
                }}>Back</button></div></div>

    )
}
