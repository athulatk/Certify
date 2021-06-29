const {mongoose}=require('../server');

const { Schema } = mongoose;

const advisoruserSchema = new Schema({
    batchId:{
        type: Schema.Types.ObjectId,
        ref:"batch",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },  
    noApplications:{
        type:Number,
        required:true
    },  
})

const advisorUser = mongoose.model("advisorUser",advisoruserSchema)
exports.advisorUser=advisorUser