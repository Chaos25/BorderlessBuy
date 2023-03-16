const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let db;
mongoose.connect('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.log('Failed to connect to MongoDB Atlas', err));
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('User', userSchema);


app.post('/Login', async(req, res) => {
  try{
    console.log(req.body.username);
    console.log(req.body.password);
    await User.findOne({
      username: req.body.username,
      password: req.body.password
  })
  .then((user) => {
      if (!user) {
          res.send('User not found');
      } else {
          res.send('User logged in successfully');
      }
  })
  .catch((err) => res.status(500).send('Failed to login'));
  }
 catch(err){
  console.log(err);
 }
 // console.log(`Username: ${username}, Password: ${password}`);

});


app.post('/Register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
});
console.log(req.body.username+" "+req.body.password);
try{
   await newUser.save()
  .then(() => res.send('User created successfully'))
  .catch((err) => res.status(500).send('Failed to create user'));
//console.log(`Username: ${username}, Password: ${password}`);
}
catch(err){
  console.log(err);
}
});

app.listen(3002, () => {
  console.log('Server listening on port 3002!');
});





