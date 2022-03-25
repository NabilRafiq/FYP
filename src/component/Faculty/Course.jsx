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
    // let docid = "1";
    // let docid1 = "1";


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
 firebase.db.collection("users").where("email", "==", user.email).get().then((querySnapshot) => {

    querySnapshot.forEach(element => {
        var dete1 = element.data();
        console.log(dete.field + " "+dete.qualification + " "+dete1.field + " "+dete1.qualification + " ")
        if (dete1.field == dete.field && dete1.qualification == dete.qualification ){
            setInfo(arr => [...arr, dete]);
            setLoading(false);
            setErr(false);
            setShow(true);
        }
        else{
            setInfo([]);
            setLoading(false);
            setErr(true);
            setShow(false);
        
        }
   })   
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
            {console.log("show:"+show+"loading:"+loading+"error:"+err)}

            {
                            (() => {
                                if (show && !err && !loading)
                                return(
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
                                        
                                    <button className="btn btn-success" ><i class="bi bi-check2-circle"></i></button>
                                    </td>
                                    {/* <td scope='col'>
                                                <button className="btn btn-success" onClick={() => { handleUpdate(data.email) }}><i class="bi bi-pencil-square"></i></button>
                                            </td> */}



                                </tr>
                            ))



                            }</tbody>



                    </table>



               </div>)
             if(!show && err && !loading)
                return(
                    <div className="d-flex justify-content-center">
                    <div class="alert alert-danger" role="alert">
                    No Course available at this moment please check back later!
                  </div></div>)
            
             if (!show && !err && loading)
             
                return(
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
