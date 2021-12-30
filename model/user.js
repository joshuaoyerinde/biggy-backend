const mongoose = require('mongoose');
const userSchema = mongoose.Schema; 

const registration = new userSchema({
    name:{ type: String, required:true},
    lastname:{ type:String, required: true},
    phone:{ type: String, required:true, unique:true},
    email:{ type:String, required:true},
    count:{ type:Number},
    link:{ type:String, required:false}

})

const User = mongoose.model('User',registration);

module.exports = User;  