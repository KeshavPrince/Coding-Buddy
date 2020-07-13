const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name : {
        type : String,
        default : '',  
        required : true,
        trim : true,
    },
    members : {
        type : [String],
        required : false,
    },
    groupType : {
        type : String,
        required : true,
    },
    messages : {
        type : [String],
        required : false,
    },
    joiningStatus : {
        type : Boolean,
        default: true,
        required : false,
    }
}, {
    timestamp : true,
});

group = mongoose.model('Groups', groupSchema);
module.exports = group;