const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    frist_name:{
        type:String
    },
    last_name:{
        type:String
    },
    avatar: {
        type: String
    },
    cover_photo: {
        type: String
    },
    bio: {
        type: String
    },
    home_address: {
        type: String
    },
    nid_number: {
        type: Number
    },
    about_me: {
        type: String
    },
    gender: {
        type: String,
        required:true
    },
    company: {
        type: String
    },
    join_date:{
        type:Date,
        default:Date.now
    }

});
module.exports = User = mongoose.model('users',userSchema);
