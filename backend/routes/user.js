const user = require("../models/user.model");

module.exports = (app) => {

    app.get("/api/user/find_groups", (req, res) => {
        const { query } = req;
        const { userid } = query;
        user.find(
            {
              _id: userid,
            },
            (err, result) => {
              if (err) {
                res.send({
                  success: false,
                  message: "Server error..",
                });
              } else {
                res.send({
                  status: true,
                  result,
                });
              }
            }
          );

    });
};
