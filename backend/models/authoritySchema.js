const {mongoose}=require('../server');

const { Schema } = mongoose;

const authoritySchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }  
})

const authority = mongoose.model("authority",authoritySchema)
exports.authority=authority