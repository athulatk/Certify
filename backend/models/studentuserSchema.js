const mongoose=require('mongoose');
const studentuserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    KtuId:{
        type:String,
        required:true
    },
    Admissionno:{
        type:String,
        required:true
    },
    Department:{
        type:String,
        required:true
    },
    Semester:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    BatchId:{
        type:String
    } ,
    Logincount:{
        type:Number
    }  
})

module.exports=mongoose.model("studentUser",studentuserSchema)