const group = require("../models/group.model");

module.exports = (app) => {
  let chooseName = [
    "Coding Warriors",
    "Dp Nerds",
    "C++ Warriors",
    "Segment tree Nerds",
    "DP is lit",
    "Avengers Debug",
    "Compiling League"
  ];
  function createGroup(userid, type) {
    return new Promise((resolve, reject) => {
      var newGroup = group();
      newGroup.name = chooseName[Math.floor(Math.random() * 7)];
      newGroup.groupType = type;
      newGroup.members = [userid];
      newGroup.save((err, groupCreated) => {
        if (err) {
          reject({ status: false });
        } else {
          resolve({
            status: true,
            groupId: groupCreated._id,
            groupName: groupCreated.name,
          });
        }
      });
    });
  }
  app.get("/api/joingroup/random", (req, res) => {
    const { query } = req;
    const { userid } = query;
    group.find(
      {
        joiningStatus: true,
        groupType: "random",
      },
      (err, result) => {
        if (err) {
          res.send({
            success: false,
            message: "Server error..",
          });
        } else if (result.length === 0) {
          createGroup(userid, "random").then((data) => {
            if (data.status) {
              res.send({
                status: true,
                groupId: data.groupId,
                groupName: data.groupName,
              });
            } else {
              res.send({ status: false, comment: "error in creating group" });
            }
          });
        } else {

          group.findById(result[0]._id, (err, data) => {
            if (err) {
              res.send({ status: false });
            } else if (data.length === 0) {
              res.send({ status: false });
            } else {
              data.members= [...data.members, userid];
              if(data.members.length == 5) {
                data.joiningStatus = false;
              }
              data.save((err) => {
                if (err) {
                  res.send({ status: false });
                } else {
                  res.send({
                    status: true,
                    groupId: result[0]._id,
                    groupName: result[0].name,
                  });
                }
              });
            }
          });
        }
      }
    );
  });

  app.get("/api/joingroup/custom", (req, res) => {
    const { query } = req;
    const { userid } = query;
    let result = createGroup(userid, "custom");
    if (result.status) {
      res.send({
        status: true,
        groupId: result.groupId,
        groupName: result.groupName,
      });
    } else {
      res.send({ status: false, comment: "error in creating group" });
    }
  });
};
