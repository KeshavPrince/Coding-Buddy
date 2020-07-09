const user = require("../models/user.model");
const userSession = require("../models/userSession.model");
const fetch = require("node-fetch");

module.exports = (app) => {
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
    return false;
  }
  app.post("/api/authenticate/signup", (req, res, next) => {
    if (req.body.name == null || req.body.name == "") {
      res.json({
        success: !true,
        message: "name is required",
      });
    } else if (req.body.email == null || req.body.email == "") {
      res.send({
        success: !true,
        message: "email is required",
      });
    } else if (
      req.body.codeforcesUserId == null ||
      req.body.codeforcesUserId == ""
    ) {
      res.send({
        success: !true,
        message: "codeforces UserId is required",
      });
    } else if (ValidateEmail(req.body.email) == false) {
      res.send({
        success: !true,
        message: "Email is Invalid",
      });
    } else if (req.body.password == null || req.body.password == "") {
      res.send({
        success: !true,
        message: "password is required",
      });
    } else {
      let query = "http://codeforces.com/api/user.info?handles=" + req.body.codeforcesUserId;
      fetch(query)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status !== "OK") {
            res.send({
              success: !true,
              message: "Codeforces User Id is InValid",
            });
          } else {
            user.find(
              {
                email: req.body.email.toLowerCase(),
              },
              (err, foundUser) => {
                if (err) {
                  res.send({
                    success: !true,
                    message: "Server error..",
                  });
                } else if (foundUser.length > 0) {
                  res.send({
                    success: !true,
                    message: "Email already have account",
                  });
                } else {
                  var newUser = new user();
                  newUser.email = req.body.email.toLowerCase();
                  newUser.name = req.body.name;
                  newUser.codeforcesUserId = req.body.codeforcesUserId;
                  newUser.password = newUser.genrateHash(req.body.password);
                  newUser.save((err, userCreated) => {
                    if (err) {
                      res.send({
                        success: !true,
                        message: "Server error..",
                      });
                    } else {
                      userSession.find(
                        {
                          userSessionId: userCreated._id,
                        },
                        (err, result) => {
                          if (err) {
                            res.send({
                              success: false,
                              message: "Server error..",
                            });
                          } else if (result.length > 0) {
                            res.send({
                              success: false,
                              message: "Already Loged in",
                            });
                          } else {
                            var newUserSession = new userSession();
                            newUserSession.userSessionId = userCreated._id;
                            newUserSession.save((errr, docs) => {
                              if (errr) {
                                res.send({
                                  success: false,
                                  message: "Server error..",
                                });
                              }
                              res.send({
                                success: true,
                                message: "Account Created..",
                                token: docs._id,
                              });
                            });
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        });
    }
  });

  app.post("/api/authenticate/signin", (req, res) => {
    if (req.body.email == null || req.body.email == "") {
      res.send({
        success: !true,
        message: "email is required",
      });
    } else if (ValidateEmail(req.body.email) == false) {
      res.send({
        success: !true,
        message: "Email is Invalid",
      });
    } else if (req.body.password == null || req.body.password == "") {
      res.send({
        success: !true,
        message: "password is required",
      });
    } else {
      user.find(
        {
          email: req.body.email.toLowerCase(),
        },
        (err, foundUsers) => {
          if (err) {
            res.send({
              success: false,
              message: "Server error..",
            });
          } else if (foundUsers.length == 0) {
            res.send({
              success: false,
              message: "No Such User Exists",
            });
          } else if (!foundUsers[0].validPassword(req.body.password)) {
            res.send({
              success: false,
              message: "Wrong Credentials..",
            });
          } else {
            userSession.find(
              {
                userSessionId: foundUsers[0]._id,
              },
              (err, result) => {
                if (err) {
                  res.send({
                    success: false,
                    message: "Server error..",
                  });
                } else if (result.length > 0) {
                  res.send({
                    success: true,
                    message: "Already Loged in",
                    token: result[0]._id,
                  });
                } else {
                  var newUserSession = new userSession();
                  newUserSession.userSessionId = foundUsers[0]._id;
                  newUserSession.save((errr, docs) => {
                    if (errr) {
                      res.send({
                        success: false,
                        message: "Server error..",
                      });
                    }
                    res.send({
                      success: true,
                      message: "Loged In..",
                      token: docs._id,
                    });
                  });
                }
              }
            );
          }
        }
      );
    }
  });

  app.delete("/api/authenticate/signout", (req, res) => {
    userSession.findByIdAndDelete(
      {
        _id: req.body._id,
      },
      (err, result) => {
        if (err) {
          res.send({
            success: false,
            message: "Server error..",
          });
        } else if (result == null) {
          res.send({
            success: false,
            message: "Not Signed In",
          });
        } else {
          res.send({
            success: true,
            message: "SignOut..",
          });
        }
      }
    );
  });

  app.get("/api/authenticate/verify", (req, res) => {
    console.log("kp");
    const { query } = req;
    const { token } = query;
    userSession.find(
      {
        _id: token,
      },
      (err, sessions) => {
        if (err) {
          res.send({
            success: false,
            message: "Server error..",
          });
        } else if (sessions.length == 0) {
          res.send({
            success: false,
            message: "Not Signed In",
          });
        } else {
          res.send({
            success: true,
            message: "Verified SignIn..",
          });
        }
      }
    );
  });
};
