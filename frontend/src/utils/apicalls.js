import { setInStorage } from "./storage";

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/authenticate/verify?token=" + token)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          resolve(true);
        } else {
          reject("error");
        }
      })
      .catch((err) => {
        console.log(err);
        reject("error");
      });
  });
}

function joinGroup(userId, groupId, groupName) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        groupId: groupId,
        groupName : groupName,
      }),
    };
    fetch("http://localhost:4000/api/user/joingroup", requestOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch((err) => {
        reject(false);
      });
  });
}

export function addToRandomGroup(userId) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/joingroup/random?userid=" + userId)
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          joinGroup(userId, json.groupId, json.groupName).then((res) => {
            if (res) {
              resolve({ status: true });
            } else {
              reject({ status: false });
            }
          });
        } else {
          reject({ status: false });
        }
      })
      .catch((err) => {
        console.log(err);
        reject("error");
      });
  });
}

export function addToCustomGroup(userId) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/joingroup/custom?userid=" + userId)
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          joinGroup(userId, json.groupId).then((res) => {
            if (res) {
              resolve({ status: true });
            } else {
              reject({ status: false });
            }
          });
        } else {
          reject({ status: false });
        }
      })
      .catch((err) => {
        console.log(err);
        reject("error");
      });
  });
}

export function signUp(details) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/authenticate/signup", details)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("Coding-Buddy_token", json.token);
          setInStorage("Coding-Buddy_userId", json.userId);
          resolve({ status: true });
        } else {
          resolve({ status: false, comment: json.message });
        }
      })
      .catch((err) => {
        reject("error");
      });
  });
}

export function signIn(details) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/api/authenticate/signin", details)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("Coding-Buddy_token", json.token);
          resolve({ status: true });
        } else {
          console.log(json);
          resolve({ status: false, comment: json.message });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
