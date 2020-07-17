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
  let chooseAvatar = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdozOeDo1rlphHQbzWVXeDNCCePYAoEKhpsQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo5Cw94w-oBFZrUbbKho_adUYKFR9tKwsziA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSY2PWrq5kSr7Y1dwsVu1joubdXABcAXVWPKw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZsYeo4gNbZoVroQkgft-kcaGPcOnDpTJV7w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6mnetSzxGcCgKJMMUOeOUNmFI8BLFBKGt-w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZ-wyVEGxk1hig_t9xExxRXuay0sDhckjYEw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTTxKvr4YkeGFyY_dlx6ES4Cg2I5NaoaTgRnQ&usqp=CAU",
  ];

  function createGroup(userid, type) {
    return new Promise((resolve, reject) => {
      var newGroup = group();
      newGroup.name = chooseName[Math.floor(Math.random() * 7)];
      newGroup.groupType = type;
      let idx = Math.floor(Math.random() * 7);
      newGroup.avatar = chooseAvatar[idx];
      newGroup.members = [userid];
      newGroup.save((err, groupCreated) => {
        if (err) {
          reject({ status: false });
        } else {
          resolve({
            status: true,
            groupId: groupCreated._id,
            groupName: groupCreated.name,
            groupAvatar : groupCreated.avatar,
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
                groupAvatar: data.groupAvatar,
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
                    groupAvatar : result[0].avatar,
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
    createGroup(userid, "custom").then( (result) => {
      if (result.status) {
        res.send({
          status: true,
          groupId: result.groupId,
          groupName: result.groupName,
          groupAvatar : result.groupAvatar,
        });
      } else {
        res.send({ status: false, comment: "error in creating group" });
      }
    });
  });
};
