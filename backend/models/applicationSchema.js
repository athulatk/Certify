const {mongoose}= require('../server');

const { Schema } = mongoose;

const applicationSchema=new Schema({
    batchId:{
        type: Schema.Types.ObjectId,
        required:true
    },
    studentId: String,
    recipent: String,
    category: String,
    letter: String,
    date: Date,
    attachments:[Buffer],
    status: String,
    returned: Boolean,
    approved: Boolean,
    feedback: String

}, {collection: 'application'})



const application = mongoose.model('application', applicationSchema);

exports.application=application