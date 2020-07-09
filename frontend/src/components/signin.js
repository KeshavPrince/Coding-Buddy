import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../utils/apicalls";
import { Redirect } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectHome, setReDirectHome] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('wolf');
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
  
      let res = await signIn(requestOptions);
      console.log(res);
      if (res) {
        setReDirectHome("/");
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
        <div>
            Signin
        </div>
      );
    }
  }