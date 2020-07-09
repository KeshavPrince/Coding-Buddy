const mongoose = require('mongoose');

const userSessionSehema = mongoose.Schema({
    userSessionId : {
        type : String
    },
} , {
    timestamps : true,
});

module.exports = mongoose.model('UserSession', userSessionSehema);