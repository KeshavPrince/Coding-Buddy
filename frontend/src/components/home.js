import React, { useState, useEffect } from "react";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/apicalls";
import { Redirect } from "react-router-dom";
import Avatar from './avatar'
import { fetchUserData } from "../utils/apicalls";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectSignIn, setReDirectSignIn] = useState("");
  const [redirectSignInBool, setReDirectSignInBool] = useState(false);
  const [userId, setUserId] = useState("");
  const [mainUser, setMainUser] = useState("");
  const init = async () => {

    let value = getFromStorage("Coding-Buddy_token");
    if (value) {
      let res = false;
      res = await verifyToken(value).catch((err) => (res = false));
      if (res) {
        setIsSignedIn(true);
        setUserId(getFromStorage("Coding-Buddy_userId"));
        let userData = await fetchUserData(userId);
        console.log(userData);
        setMainUser('wolf');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setReDirectSignIn("/authenticate/signin");
        setReDirectSignInBool(true);
      }
    } else {
      setIsLoading(false);
      console.log("No Such Token Exist");
      setReDirectSignInBool(true);
      setReDirectSignIn("/authenticate/signin");
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (redirectSignInBool) {
    return <Redirect to={redirectSignIn} />;
  } else if (isLoading) {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="center-align">
          <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else 
  {
    return <div>Wolf</div>
  }
   
}
