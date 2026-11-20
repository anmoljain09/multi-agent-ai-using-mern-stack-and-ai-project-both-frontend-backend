import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        username : {type : String , required : true},
        email : {type : String , required : true , unique : true},
        password : {type : String , required : false},

        firebaseUid : {type : String , unique : true},
        avatar : {type : String}
    } ,
    {
        timestamps : true
    }

);

const userModel = mongoose.model('users' , userSchema);

export default userModel;