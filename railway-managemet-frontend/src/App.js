import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AddTrain from "./components/Trains/AddTrain";
import TrainList from "./components/Trains/TrainList";
import Booking from "./components/Bookings/Booking";
import Home from "./components/Home/Home";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/add-train" element={<AddTrain token={token} />} />
          <Route path="/trains" element={<TrainList token={token} />} />
          <Route path="/booking" element={<Booking token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
