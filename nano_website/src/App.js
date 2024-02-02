// Import necessary components and libraries
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './components/Home';
import People from './components/People';
import Biosensing from './components/Biosensing';
import EBeam from './components/EBeam';
import EnergyStorage from './components/EnergyStorage';
import Login from './components/login';
import Biosensor from './components/Biosensor';
import Register from './components/Register'

function App() {

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/People" exact element={<People />} />
          <Route path="/Biosensing" exact element={<Biosensing />} />
          <Route path="/EBeam" exact element={<EBeam />} />
          <Route path="/EnergyStorage" exact element={<EnergyStorage />} />
          <Route path="/Biosensor" exact element={<Biosensor />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/Register" exact element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
