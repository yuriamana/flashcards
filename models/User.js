const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: {type: String, unique: true},
    password: String,
    avatar: {type: String, default: "https://res.cloudinary.com/dvhluvgbn/image/upload/v1635150264/avatar-159236_960_720_d3v3jx.png"}

})
    
    
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel
