const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://certify:webtech123@cluster0.aq7ck.mongodb.net/certify?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
const { Schema } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});
const applicationSchema=new Schema({
  studentId: String,
  recipent: String,
  category: String,
  letter: String,
  date: Date,
  attachments: [{
    file: Buffer,
    name: String
  }],
  status: String,
  returned: Boolean,
  approved: Boolean,
  feedback: String

}, {collection: 'application'})


// const studentUserSchema=new Schema({
//   email: String,
//   password: String,
//   ktuId: String
// }, {collection: 'studentUser'})

application = mongoose.model('application', applicationSchema);
// studentUser = mongoose.model('studentUser', studentUserSchema);

exports.application=application
// exports.studentUser=studentUser
