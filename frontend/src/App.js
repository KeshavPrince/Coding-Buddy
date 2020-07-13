import React from 'react';
import './App.css'
import Signin from "./components/signin";
import Signup from "./components/signup";
import Home from "./components/home";
import { Route, BrowserRouter } from "react-router-dom";

function App(){
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/authenticate/signup" component={Signup} />
          <Route path="/authenticate/signin" component={Signin} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
