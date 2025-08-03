import {Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext} from '../Context/AuthContext';
import { Children } from 'react';


const ProtectedRoute = ({children}) => {

const{currentUser} = useContext(AuthContext)

   
 if(!currentUser){
       return <Navigate to="/LoginPage"  />;


 }

  return children;

}

export default ProtectedRoute;
