import React, { useState,useContext,useEffect } from 'react'
import{useNavigate} from "react-router-dom" 
import { AuthContext} from '../Context/AuthContext';



 

const LoginPage = () => {

 const{email,setEmail,password,setPassword,currentUser,setCurrentUser,Login,users,setUsers} =useContext(AuthContext)
 const navigate = useNavigate();

 useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);



 

const handleLogin = ()=>{
  
  
 const isLogIn = Login((email,password));
 if(isLogIn){
  alert("LogIn Successful")
  setEmail("");
 setPassword("");
  } 
}



  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-400 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

        <input
          className="w-full mb-4 px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 px-4 py-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition duration-300"
          onClick={handleLogin}
        >
          Log In
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a  href="/register" className=" link text-blue-500 underline">
            Register here
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default LoginPage
