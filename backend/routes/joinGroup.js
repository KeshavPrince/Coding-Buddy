const group = require("../models/group.model");


module.exports = (app) => {

    let chooseName = ["Coding Warriors", "Top Nerds", "C++ Warriors", "Segment tree Nerds", "DP is lit"];
    function createGroup(userid, type) {
        return new Promise((resolve, reject) => {
        var newGroup = group();
        newGroup.name = chooseName[Math.floor(Math.random() * 5)];
        newGroup.groupType = type;
        newGroup.members = [userid];
        newGroup.save((err, groupCreated) => {
            if(err) {
                reject({status : false});
            }
            else {
                resolve({status : true, groupId : groupCreated._id, groupName : groupCreated.name});
            }
        });
      });
    }
    app.get("/api/joingroup/random", (req, res) => {
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
                createGroup(userid, 'random').then((data)=> {
                  if(data.status) {
                    res.send({status : true, groupId : data.groupId, groupName : data.groupName})
                }
                else {
                    res.send({status : false, comment : 'error in creating group'});
                }
                });
              }
              else {
                res.send({status : true, groupId : result[0]._id, groupName : result[0].name});
              }
            }
          );

    });


    app.get("/api/joingroup/custom", (req, res) => {
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
