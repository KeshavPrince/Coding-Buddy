import React, { useState, useEffect } from "react";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/apicalls";
import { Redirect } from "react-router-dom";

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectSignIn, setReDirectSignIn] = useState("");
  const [redirectSignInBool, setReDirectSignInBool] = useState(false);

  const init = async () => {
    let value = getFromStorage("Coding-Buddy_token");
    if (value) {
      let res = false;
      console.log(value);
      res = await verifyToken(value).catch((err) => (res = false));
      console.log(res);
      if (res) {
        console.log('wolfie');
        setIsSignedIn(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setReDirectSignIn('/authenticate/signin');
        setReDirectSignInBool(true);
      }
    } else {
      setIsLoading(false);
      console.log("No Such Token Exist");
      setReDirectSignInBool(true);
      setReDirectSignIn('/authenticate/signin');
    }
  };

  useEffect(() => {
    init();
  }, []);

  if(redirectSignInBool)
  {
    console.log('thala');
    return  <Redirect to={redirectSignIn} />;
  }
  else if (isLoading) {
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
  } else {
    return <div>
      <div className="row"> 
        <div className="col s4">
          <div className="newcontainer blue">
          
          </div>
        </div>
        <div className="col s8">
          <div className="newcontainer red">
            
          </div>
        </div>
      </div>
    </div>;
  }
}
