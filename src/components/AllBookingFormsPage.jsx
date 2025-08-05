import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const serviceConfigs = {
  "Flight Booking": ["fullName", "dob", "flightDate", "from", "to", "passportNumber"],
  "Hotel Reservation": ["fullName", "dob", "checkInDate", "checkOutDate", "hotelName", "roomType"],
  "Car Rentals": ["fullName", "dob", "rentalDate", "returnDate", "pickupLocation", "carType"],
  "Cruise Booking": ["fullName", "dob", "cruiseDate", "cabinType", "destination"],
  "Emergency Support": ["fullName", "dob", "emergencyType", "contactNumber", "location"],
  "Travel Insurance": ["fullName", "dob", "insuranceStart", "insuranceEnd", "coverageAmount"],
  "Group Travel": ["fullName", "dob", "groupSize", "destination", "travelDate"],
  "Visa Assistance": ["fullName", "dob", "destinationCountry", "passportNumber", "applicationDate"],
  "Guided Tours": ["fullName", "dob", "tourDate", "location", "languagePreference"]
};

const AllBookingFormsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const service = state?.service;
  const fields = serviceConfigs[service] || [];

  const [form, setForm] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // clear error on input
  };

  const validateForm = () => {
    const errors = {};

    fields.forEach((field) => {
      const value = form[field];

      if (!value.trim()) {
        errors[field] = "This field is required.";
      } else {
        // Specific field validations
        if (field.toLowerCase().includes("date") || field === "dob") {
          const selectedDate = new Date(value);
          if (isNaN(selectedDate.getTime())) {
            errors[field] = "Invalid date.";
          }
        }

        if (field === "passportNumber") {
          if (!/^[A-Z0-9]{6,10}$/i.test(value)) {
            errors[field] = "Invalid passport number.";
          }
        }

        if (field === "contactNumber") {
          if (!/^\d{10}$/.test(value)) {
            errors[field] = "Enter a valid 10-digit phone number.";
          }
        }

        if (field === "coverageAmount" || field === "groupSize") {
          if (isNaN(value) || Number(value) <= 0) {
            errors[field] = "Enter a valid number.";
          }
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.email) {
      alert("User not logged in.");
      return;
    }

    if (!validateForm()) {
      return; // stop submission if errors
    }

    const userKey = `bookings_${currentUser.email}`;
    const existing = JSON.parse(localStorage.getItem(userKey)) || [];

    const newBooking = {
      service,
      date: new Date().toISOString(),
      ...form,
    };

    localStorage.setItem(userKey, JSON.stringify([...existing, newBooking]));

    navigate("/payment", { state: { ...form, service } });
  };

  if (!service) {
    return <p className="text-center mt-20 text-xl">No service selected.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-5 rounded-2xl shadow-xl mt-3 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-2 mt-5 text-gray-800">
          {service}
        </h2>

        {fields.map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-2 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                field.toLowerCase().includes("date") || field.toLowerCase().includes("dob")
                  ? "date"
                  : field.toLowerCase().includes("email")
                  ? "email"
                  : field.toLowerCase().includes("number")
                  ? "number"
                  : "text"
              }
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className={`w-full p-2 border rounded ${
                formErrors[field] ? "border-red-500" : ""
              }`}
            />
            {formErrors[field] && (
              <p className="text-sm text-red-600 mt-1">{formErrors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-emerald-700 text-white p-2 rounded hover:bg-emerald-800 transition"
        >
          Proceed to Payment
        </button>
      </motion.form>
    </div>
  );
};

export default AllBookingFormsPage;
