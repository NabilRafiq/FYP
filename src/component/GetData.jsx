import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { db } from '../firebase';
import { Navigate, useNavigate } from 'react-router';
import {Link} from "react-router-dom";
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
                
               alert(" Data Deleted Successfully");
               


            })



            .catch((error) => {
                alert(error.message)
            })


    }
    const handleUpdate = async (data) => {
       
        // {
        //     <form >
        //         <input type="text" placeholder='name' />
        //     </form>
        // }



        let newname = prompt("Please enter name", "Updated Name");
if(newname == null || newname == "Updated Name"){
    newname=data.name
}
  
  await db.collection("facultyform").where("name", "==", data.name).get()
  .then(querySnapshot => {
    querySnapshot.docs[0].ref.update({
        name:newname
    });
                
 
    alert(" Data Updated Successfully");

  })



  .catch((error) => {
      alert(error.message)
  })

       


    }


 

  



    return (
        <div>
            <Helmet>
                <title>Faculty Data</title>
            </Helmet>

           

            {console.log(info)}
            <div style={{ marginTop: '70px' }} className="container">
            <h3 style={{ textAlign: 'center', marginBottom: '50px' }}>Faculty Data</h3>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Field</th>
                        </tr></thead>
                    <tbody>
                        {


                            info.map((data) => (
                                <tr>

                                    <td>
                                        {data.name}
                                    </td>
                                    <td>
                                        {data.email}
                                    </td>
                                    <td>
                                        {data.field}

                                    </td>
                                    <th scope='col'>
                                        <button className="btn btn-danger" onClick={() => { handleDelete(data.name) }}><i class="bi bi-trash"></i></button>
                                    </th>
                                    <th scope='col'>
                                      
                                        <button className="btn btn-primary" onClick={()=>handleUpdate(data)}><i class="bi bi-pencil-square"></i></button>

                                       
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