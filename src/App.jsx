import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from './Pages/Home';
import FirstPage from './Pages/FirstPage';
import { NavbarProvider } from './Context/NavbarContext';
import Navbar from "./Pages/Navbar";
import TransportOpt from "./Pages/TransportOpt";
import Booking from "./components/Booking";
import OurServices from "./Pages/OurServices";
import Gallery from "./Pages/Gallery";
import PaymentForm from "./Pages/PaymentForm";
import ItineraryPlanner from "./Userdata/ItineraryPlanner";
import CheckList from "./Userdata/CheckList";
import Map from "./Userdata/Map";
import { TodoProvider } from "./Context/TodoContext";
import Footer from "./Pages/Footer";
import AllBookingFormsPage from "./components/AllBookingFormsPage";




const AppRoute = () => {
  const location = useLocation();
  const noNavbarRoutes = ["/register", "/login"];

  const shouldHideNavbar = noNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/transportOpt" element={<TransportOpt />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/our-services" element={<OurServices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/itinerary" element={<ItineraryPlanner />} />
        <Route path="/checklist" element={<CheckList />} />
        <Route path="/map" element={<Map />} /> 
        <Route path="/book-service" element={<AllBookingFormsPage />} />


        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<FirstPage />} />.
         <Route path="/footer" element={<Footer />} />.
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavbarProvider>
          <TodoProvider>
            <AppRoute />
          </TodoProvider>
        </NavbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
