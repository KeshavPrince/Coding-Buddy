const group = require("../models/group.model");


module.exports = (app) => {

    function createGroup(userid, type) {
        var newGroup = group();
        newGroup.name = 'Coding Wariors';
        newGroup.groupType = type;
        newGroup.members.add(userid);
        newGroup.save((err, groupCreated) => {
            if(err) {
                return {status : false};
            }
            else {
                return {status : true, groupId : groupCreated._id};
            }
        });
        
    }

    app.get("/api/joinGroup/random", (req, res) => {
        const { query } = req;
        const { userid } = query;
        group.find(
            {
              joiningStatus: false,
              groupType : 'random',
            },
            (err, result) => {
              if (err) {
                res.send({
                  success: false,
                  message: "Server error..",
                });
              } else if(result.length === 0) {
                let result = createGroup(userid, 'random');
                if(result.status) {
                    res.send({status : true, groupId : result.groupId})
                }
                else {
                    res.send({status : false, comment : 'error in creating group'});
                }
              }
              else {
                res.send({status : true, groupId : result[0]._id});
              }
            }
          );

    });


    app.get("/api/joinGroup/custom", (req, res) => {
        const { query } = req;
        const { userid } = query;
        let result = createGroup(userid, 'custom');
        if(result.status) {
            res.send({status : true, groupId : result.groupId})
        }
        else {
            res.send({status : false, comment : 'error in creating group'});
        }

    });
};
