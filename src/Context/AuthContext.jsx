import {Navigate} from 'react-router-dom';
import {Children, createContext,useEffect,useState} from 'react'



 export const AuthContext = createContext();

 
 export const AuthProvider = ({children})=>{
    const[users ,setUsers]=useState([])
    const [currentUser, setCurrentUser] = useState(null); 
    const[uname , setUname]=useState()
    const[email , setEmail]=useState()
    const[password , setPassword]=useState()
     
    useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedIn) {
      setCurrentUser(loggedIn);
    }
  }, []);

   
    const Register = (uname, email, password,) => {
      
      const newUser = {uname,email,password}
      
          const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  
      const isExist = existingUsers.find(user => user.email === email);
      if (isExist) {
       alert("User already exists!");
      return;
       }
      
    
    const updatedUsers =[...existingUsers, newUser]
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert("Registered successfully! Please log in.");
 
  };


    const Login =()=>{
         const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = existingUsers.find((users) => users.email === email && users.password === password)

  if (matchedUser) {
      setCurrentUser(matchedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      return true;
    } 
    else {
      alert("Invalid credentials!");
      return false;
    }
  };
    
     const Logout = () => {
       localStorage.removeItem("loggedInUser");
       setCurrentUser(null);
       alert("Logged out successfully!");
       return true;
      

   };



  return (
    <AuthContext.Provider value={{ users,setUsers,uname,setUname,password,setPassword,email,setEmail,Login ,Register,Logout,currentUser,setCurrentUser,}  }>
      {children}
    </AuthContext.Provider>
  ); 

}