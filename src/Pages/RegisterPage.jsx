import React, { useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext} from '../Context/AuthContext';

const RegisterPage = () => {
  const{uname,setUname,email,password,Register,setPassword,setEmail} =useContext(AuthContext)
  const navigate = useNavigate();
  const[ConfirmPassword,setConfirmPassword]=useState("");



   

  const submitHandler = (e)=>{
    e.preventDefault();
       if(password !== ConfirmPassword)
    {
      alert("Password is not matched")
      return;
    }
    if (!uname || !email || !password || !ConfirmPassword ){
      alert("please enter all fields");
      return;
    }
    
  Register(uname,email,password);
  
   setUname("")
    setConfirmPassword("");
    setEmail("") ;
      setPassword("");
      alert("Registration successful")
    navigate("/");
       };

return (
    <div>
      <form onSubmit={submitHandler} className="m-20 w-[30%] h-[40%] p-5 bg-gray-500 align-center justify
       ">
        <h1 className='text-xl p-5 m-5 font-semibold bg-blue-800 '>Register</h1>
        <hr />
        
                 <label htmlFor="UserName"> Name:</label> <br />
        <input type="text" value={uname} onChange={(e)=>  setUname(e.target.value ) }
         placeholder='enter your name' id='uname' /><br /><br />
         <label htmlFor="email">Email:</label> <br />
        <input type="email" value={email} onChange={(e)=>  setEmail(e.target.value ) }
      placeholder='enter your Email' id="email"/> <br /><br />
 <label htmlFor="Password"> Password:</label> <br />
        <input value={password} onChange={(e)=>  setPassword(e.target.value ) }  
        type="password" placeholder='Password' id="Password"/> <br /><br /> 
         <label htmlFor="ConfirmPassword"> ConfirmPassword:</label> <br />
         <input value={ConfirmPassword} onChange={(e)=>  setConfirmPassword(e.target.value ) }  
         type="password" placeholder='ConfirmPassword' id="ConfirmPassword"/> <br /><br /> 

         <br/>
      
       <button  className='bg-yellow-800 items-center'>Register</button>
 </form>
 </div>
 
  )}
  export default RegisterPage;

  
