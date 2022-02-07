import React,{useState,useEffect} from 'react';
import './Admin.css'
import * as firebase from '../../firebase';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
export default function Dashboard(){

  useEffect(() => {
    // change background color with a random color
    const color =  "#f0f2f0";
    document.body.style.background = color;
  });



    const history= useNavigate()
    const [info, setInfo] = useState([]);
    const [disable, setDisable] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
             await firebase.auth.signOut();
            history('/', { replace: true })
        } catch (err) {
            alert(err.message);
        }
    }
    const userInformation = async (e) => {
        
      const user = firebase.auth.currentUser;

      setDisable(true);
      setLoading(true);
      try {
          
          await  firebase.db.collection("programmanager").where("email", "==", user.email).get()
          .then(querySnapshot => { 
                 
                      querySnapshot.forEach(element => {
                          var data = element.data();
                          setInfo(arr => [...arr, data]);

                          

                      })
                  setLoading(false);
                    });
                 
            

      } catch (err) {
          alert(err.message);
      }
  
  }
 

    return(
        <div className="ada_container">
                  <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#192841'}}>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className=" collapse navbar-collapse" id="navbarNavDropdown" >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" >Home</a>
        </li>
      
      
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Faculty
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/facultyform',{replace:true})}}
                 className="dropdown-item" >
                Faculty Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Faculty Data
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/search',{replace:true})}}
                 className="dropdown-item" >
                Search Faculty
                </a></li>
   
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Coordinator
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/aaform',{replace:true})}}
                 className="dropdown-item" >
                Coordinator Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/aagetdata',{replace:true})}}
                 className="dropdown-item" >
                Coordinator Data
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/acsearch',{replace:true})}}
                 className="dropdown-item" >
                Search Coordinator
                </a></li>
                

          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Course
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/cform',{replace:true})}}
                 className="dropdown-item" >
                Course Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Course Data
                </a></li>
      
          </ul>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa fa-bullhorn" style={{fontSize:"large",color:"white"}} aria-hidden="true"></i>
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/facultyform',{replace:true})}}
                 className="dropdown-item" >
                Annoucement Form
                </a></li>
                <li><a style={{cursor:'pointer'}} onClick={()=>{
                history('/getdata',{replace:true})}}
                 className="dropdown-item" >
                Annoucement Data
                </a></li>
      
          </ul>
        </li> */}
     
        <li className="nav-item">
           <a onClick={handleLogin} style={{cursor:'pointer'}} className="nav-link active" aria-current="page" >
              Logout
          </a> 

         
        </li>
      </ul>
    </div>
  </div>
</nav>
          
            
<div className="ad_container container" >

<h3 style={{ textAlign: "center", margin: '50px' }}>User's Information</h3>

<button disabled={disable} className='fa_button btn d-grid gap-2 col-6 mx-auto' type='button' onClick={() => { userInformation() }}>Show Information</button>
{
                (() => {
                    if(loading) {
                            return (
                              <div class="text-center" style={{margin:"10px"}}>
                              <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
                            )
                        } 
                })()  
            }  
<div className="row" >
{


info.map((data) => (
  <div className="d-flex justify-content-center">
    <form action=""  className="ad_form">
    
        <label for="uname" className='ad_label form-label'><b>Name</b></label>
        <input type="text" readOnly value={data.name} className='fa_input form-control'  name="uname" />
        <label for="program" className='ad_label form-label'><b>Program</b></label>
        <input type="text" readOnly value={data.program} className='ad_input form-control' name="program" />
        <label for="Email" className='ad_label form-label'><b>Email</b></label>
        <input type="email" readOnly value={data.email} className='ad_input form-control'  name="Email" />
        <label for="role" className='ad_label form-label' ><b>Role</b></label>
        <input type="text" readOnly value={data.role} disabled className='ad_input form-control' readonly  name="role" />

    </form></div>
))}
    </div>


</div>  

            

        </div>
    )
}



