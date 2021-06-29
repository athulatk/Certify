const {mongoose}=require('../server');

const { Schema } = mongoose;

const batchSchema = new Schema({
    department:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
})

const batch = mongoose.model("batch",batchSchema)
exports.batch=batch