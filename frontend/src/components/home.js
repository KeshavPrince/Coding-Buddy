import React, { useState, useEffect } from "react";
import { getFromStorage } from "../utils/storage";
import { verifyToken } from "../utils/apicalls";

export default function Home() {
  
  const [isSignedIn, setIsSignedIn] = useState(false);

  const init = async () => {
    let value = getFromStorage("HireSnapper_token");
    if (value) {
      let res = false;
      res = await verifyToken(value).catch(err => res = false);  
      if(res) {
          setIsSignedIn(true);
      }
      else {
      }
    }
    else {
      console.log('No Such Token Exist');
    }
   }

  useEffect(() => {
     init();
  }, []);
  
   return ( <div>
    Home
  </div>);
  }