import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./fontawesome";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Flights from "./components/Flights/Flights";
import Footer from "./components/Footer/Footer";
import Passenger from "./components/Passenger/Passenger";
import EditPassenger from "./components/Passenger/EditPassenger";
import Flight from "./components/Flights/EditFlights";
 function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/flights" element={<Flights/>} />
                <Route path="/passenger" element={<Passenger/>} />
                <Route path="/EditPassenger/:id" element={<EditPassenger/>} />
                <Route path="/EditFlights/:id" element={<Flight/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;