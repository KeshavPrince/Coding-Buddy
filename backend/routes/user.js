const user = require("../models/user.model");

module.exports = (app) => {

  app.put("/api/user/joingroup", (req, res) => {
    const  query  = req.body;
    const  userid  = query.userId;
    const  groupid  = query.groupId;
    const  groupname = query.groupName;
    const  groupavatar = query.groupAvatar;
    console.log(groupavatar);
    user.findById(userid, (err, data) => {
      if (err) {
        res.send({ status: false });
      } else if (data.length === 0) {
        res.send({ status: false });
      } else {
        data.groups= [...data.groups, {id : groupid, name : groupname, avatar : groupavatar}];
        data.save((err) => {
          if (err) {
            res.send({ status: false });
          } else {
            res.send({ status: true });
          }
        });
      }
    });
  });

  app.get("/api/user/details", (req, res) => {
    let { query } = req;
    let { userid } = query;
    user.findById(userid, (err, data) => {
      if (err) {
        res.send({ status: false });
      } else if (data.length === 0) {
        res.send({ status: false });
      } else {
        res.send({status : true, data : data});
      }
  });
});

}