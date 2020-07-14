const user = require("../models/user.model");

module.exports = (app) => {
  app.put("/api/user/joingroup", (req, res) => {
    const { query } = req.body;
    const { userid } = query;
    const { groupid } = query;
    const { groupname} = query;
    user.findById(userid, (err, data) => {
      if (err) {
        res.send({ status: false });
      } else if (data.length === 0) {
        res.send({ status: false });
      } else {
        data.groups= [...data.groups, {id : groupid, name : groupname}];
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
};
