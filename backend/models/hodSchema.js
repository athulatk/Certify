const {mongoose}=require('../server');

const { Schema } = mongoose;

const hoduserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
})

const hodUser = mongoose.model("hodUser",hoduserSchema)
exports.hodUser=hodUser