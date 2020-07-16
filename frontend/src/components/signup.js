import React from "react";
import { signUp } from "../utils/apicalls";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SignUp() {
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [codeforcesUserId, setCodeforcesUserId] = useState("");
    const [password, setPassword] = useState("");
    const [redirectHome, setReDirectHome] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          codeforcesUserId : codeforcesUserId,
          password: password,
        }),
      };
      let res = await signUp(requestOptions);
      if(res.status)
      {
        setReDirectHome("/");
      }
      else
      {
        alert(res.comment);
      }
    };
  
    const handleChangeName = (e) => {
      setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
      setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
    const handleChangeCodeforcesUserId = (e) => {
      setCodeforcesUserId(e.target.value);
    };
    
    if (redirectHome) {
      return <Redirect to={redirectHome} />;
    } else
      return (
        <div className="center container grey lighten-3">
          <h2 className="blue-text">Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
          <div className="input-field">
          <input id="name" type="text" className="validate" onChange={handleChangeName}/>
          <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
          <input id="email" type="text" className="validate" onChange={handleChangeEmail}/>
          <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
          <input id="codeforcesUserId" type="text" className="validate" onChange={handleChangeCodeforcesUserId}/>
          <label htmlFor="codeforcesUserId">Codeforces UserId</label>
          </div>
          <div className="input-field">
          <input id="password" type="password" className="validate" onChange={handleChangePassword}/>
          <label htmlFor="password">Password</label>
          </div>
          <br></br>
          <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
          </button>
          </form>
        </div>
      );
  }