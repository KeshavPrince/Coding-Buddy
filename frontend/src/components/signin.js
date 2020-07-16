import React from "react";
import { useState } from "react";
import { signIn } from "../utils/apicalls";
import { Redirect } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectHome, setReDirectHome] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      let res = await signIn(requestOptions);
      if (res.status) {
        setReDirectHome("/");
      }
      else
      {
        alert(res.comment);
      }
    };
  
    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
  
    if (redirectHome) {
      return <Redirect to={redirectHome} />;
    } else {
      return (
        <div className="center container grey lighten-3">
          <h2 className="blue-text">Sign In</h2>
          <form onSubmit={handleSubmit} noValidate>
          <div className="input-field">
          <input id="email" type="text" className="validate" onChange={handleChangeEmail}/>
          <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
          <input id="password" type="password" className="validate" onChange={handleChangePassword}/>
          <label htmlFor="password">Password</label>
          </div>
          <br></br>
          <button className="btn waves-effect waves-light" type="submit" name="action">Sign In
          </button>
          </form>
        </div>
      );
    }
  }