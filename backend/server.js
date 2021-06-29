const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://certify:webtech123@cluster0.aq7ck.mongodb.net/certify?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

exports.mongoose=mongoose
