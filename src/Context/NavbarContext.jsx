
import { createContext,useState } from "react";


export const NavbarContext = createContext();

export const NavbarProvider = ({children}) =>{
     
    const [MenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = ()=>{
     setMenuOpen (prev => !prev);
};
 const closeMenu = () => {
    setMenuOpen(false);

 }
 
 return (
  <NavbarContext.Provider value={{ MenuOpen,toggleMenu,closeMenu, setMenuOpen}}>
 {children}
 </NavbarContext.Provider>

 );

};