const {mongoose}=require('../server');

const { Schema } = mongoose;

const studentuserSchema = new Schema({
    batchId:{
        type: Schema.Types.ObjectId,
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
    ktuId:{
        type:String,
        required:true
    },
    admissionNo:{
        type:String,
        required:true
    },
    // department:{
    //     type:String,
    //     required:true
    // },
    // semester:{
    //     type:String,
    //     required:true
    // },
    phone:{
        type:String,
        required:true
    },
    batchId:{
        type:String
        // required:true
    } ,
    loginCount:{
        type:Number,
        required:true
    }  
})

const studentUser = mongoose.model("studentUser",studentuserSchema)
exports.studentUser=studentUser