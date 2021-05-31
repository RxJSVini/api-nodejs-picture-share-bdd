const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})


module.exports = mongoose.model("UserScheme", UserScheme);