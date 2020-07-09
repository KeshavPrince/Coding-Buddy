import React, { Component } from 'react';
import './App.css'
import Signin from "./components/signin";
import Signup from "./components/signup";
import Home from "./components/home";
import { Route, BrowserRouter } from "react-router-dom";

function App(){
  return (
    <div className="overlay">
      <div class="card-panel teal lighten-2">Wolf</div>
    </div>
  );
}

export default App;
