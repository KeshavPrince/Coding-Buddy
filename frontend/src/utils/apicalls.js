import { setInStorage } from "./storage";

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
  fetch("http://localhost:4000/api/authenticate/verify?token=" + token)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if(json.success) {
        resolve(true);
      } else {
        reject('error');
      }
    })
    .catch((err) => {
      console.log(err);
      reject('error');
    }
  );
  });
}

export function signUp(details) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/authenticate/signup", details)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage('Coding-Buddy_token', json.token);
          resolve({status : true});
        } else {
          resolve({status : false, comment : json.message});
        }
      })
      .catch((err) => {
        reject('error');
      });
  });
}

export function signIn(details) {
  return new Promise((resolve, reject) => {
  fetch("http://localhost:4000/api/authenticate/signin", details)
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        setInStorage('Coding-Buddy_token', json.token);
        resolve({status : true});
      } else {
        console.log(json);
        resolve({status : false, comment : json.message});
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}