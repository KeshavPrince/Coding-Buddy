const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        trim : true,
        default : '',
        required : true
    },
    name : {
        type : String,
        default : '',  
        required : true,
        trim : true,
    },
    codeforcesUserId : {
        type : String,
        default : '',  
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
        trim : false,
    },
    groups : {
        type : [{
            name : {
                type : String,
            },
            id : {
                type : String,
            },
            avatar : {
                type : String,
            }
        }],
        required : false,
    }
}, {
    timestamp : true,
});

userSchema.methods.genrateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

user = mongoose.model('Users', userSchema);
module.exports = user;