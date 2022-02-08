// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../firebase';
// import { Navigate, useNavigate } from 'react-router';
// import { Helmet } from 'react-helmet';
// import './../Login/Login.css';


// export default function ForgotPass() {


//   useEffect(() => {
//     // change background color with a random color
//     const color =  "#f0f2f0";
//     document.body.style.background = color;
//   });

//     const [email, setEmail] = useState('')

//     const history = useNavigate()





//     // const handleSubmit = async (e) => {


//     //     e.preventDefault()

//     //     try {


//     //         await auth.signInWithEmailAndPassword(email, password)

//     //             .then(() => {

//     //                 db.collection("users").where("email", "==", email).get().then(querySnapshot => {
//     //                     querySnapshot.forEach(element => {
//     //                         var data = element.data();
//     //                         if (data.role === "admin") {
//     //                             history('/Admin', { replace: true })
//     //                         }
//     //                         else if (data.role === "coordinator") {
//     //                             history('/Dashboard', { replace: true })
//     //                         }
//     //                         else if (data.role === "faculty") {
//     //                             history('/Faculty', { replace: true })
//     //                         }

//     //                     })
//     //                 });
//     //             })



//     //     } catch (err) {
//     //         alert(err.message);
//     //     }

//     // }


//     return (
//         <div className="Login">
//             <Helmet>
//                 <title>ForgotPassword</title>
//             </Helmet>





//             <div className="l_container container-sm ">
//                 <form className='l_form' style={{width:"30%"}} >

//                     <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Password</h4>

//                     <label htmlFor="uname" className='form-label'><b>Email</b></label>

//                     <input className='l_input form-control' type="email" placeholder="Enter Email" name="uname" required onChange={(e) => setEmail(e.target.value)} />

            
//                     <div style={{ textAlign: 'center', marginTop:"50px" }}>
// {/* 
//                         <button className="l_button btn" type="submit" id='lbutton' onClick={(e) => handleSubmit(e)}>Submit</button> */}
//                         <br />
//                         <button id='l_button' style={{width:"10%",color:"black",backgroundColor:"white",fontSize:"large"}} className="l_button btn"><i class="bi bi-arrow-left"></i></button>




//                     </div>


//                 </form>


//             </div>
           

//         </div>
//     )
// }