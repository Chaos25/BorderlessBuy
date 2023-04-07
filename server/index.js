const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const path=require('path')
const dotenv=require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/payment", require("./routes/payment"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let db;
const userDbConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const choicesDbConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const BuyerDbConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

/*mongoose.connect('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.log('Failed to connect to MongoDB Atlas', err));*/
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const BuyerSchema = new mongoose.Schema({
  username: String,
  password: String
});
var uname;


const choicesSchema = new mongoose.Schema({
  username: String,
  product: String,
  link:String,
  pickup:String,
  drop:String

});

const User= userDbConnection.model('UserCredentials', userSchema);
const Buyer= BuyerDbConnection.model('BuyerCredentials', BuyerSchema);
const Choices = choicesDbConnection.model('UserChoices', choicesSchema);

// Connect to the MongoDB server
userDbConnection.on('connected', function () {
  console.log('Connected to user database');
});
BuyerDbConnection.on('connected', function () {
  console.log('Connected to buyer database');
});
userDbConnection.on('error', function (err) {
  console.log('Error connecting to user database:', err.message);
});
BuyerDbConnection.on('error', function (err) {
  console.log('Error connecting to buyer database:', err.message);
});
choicesDbConnection.on('connected', function () {
  console.log('Connected to choices database');
});
choicesDbConnection.on('error', function (err) {
  console.log('Error connecting to choices database:', err.message);
});
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
      const username = user.username;
      uname=user.username;
      // Define an array of choices based on user input
      
  })
  .catch((err) => res.status(500).send('Failed to login'));
  }
 catch(err){
  console.log(err);
 }
 // console.log(`Username: ${username}, Password: ${password}`);

});
app.post('/LoginBuyer', async(req, res) => {
  try{
    console.log(req.body.username);
    console.log(req.body.password);
    await Buyer.findOne({
      username: req.body.username,
      password: req.body.password
  })
  .then((user) => {
      if (!user) {
          res.send('Buyer not found');
      } else {
          res.send('Buyer logged in successfully');
      }
      const username = user.username;
      uname=user.username;
      // Define an array of choices based on user input
      
  })
  .catch((err) => res.status(500).send('Failed to login'));
  }
 catch(err){
  console.log(err);
 }
 // console.log(`Username: ${username}, Password: ${password}`);

});

      app.post('/Findmatch',async(req,res)=>{
        const product =req.body.pname;
        const link =req.body.link;
        const pickup =req.body.locUser;
        const drop =req.body.locBuyer;
        console.log(product);
      // Create a new document for the user's choices, using the extracted username field from UserCredentials
      const userChoices = new Choices({
        username: uname,
        product:product,
        link:link,
        pickup:pickup,
        drop:drop
      });
  
      // Save the document to the UserChoices collection
      await userChoices.save()
      .then(() => res.send('Product submitted'))
      .catch((err) => res.status(500).send('Product failed'));
      })
app.post('/Register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
});
console.log(req.body.username+" "+req.body.password);
u=req.body.username;
uname=u;
const userExists = await User.findOne({ username:u });
    if (userExists) {
      return res.send({ error: 'User with email already exists' });
    }
    else{
      try{
        await newUser.save()
       .then(() => res.send('User created successfully'))
       .catch((err) => res.status(500).send('Failed to create user'));
     //console.log(`Username: ${username}, Password: ${password}`);
     }
     catch(err){
       console.log(err);
     }
    }

});
app.post('/RegisterBuyer', async (req, res) => {
  const newUser = new Buyer({
    username: req.body.username,
    password: req.body.password
});
console.log(req.body.username+" "+req.body.password);
u=req.body.username;
uname=u;
const userExists = await Buyer.findOne({ username:u });
    if (userExists) {
      return res.send({ error: 'Buyer with email already exists' });
    }
    else{
      try{
        await newUser.save()
       .then(() => res.send('Buyer created successfully'))
       .catch((err) => res.status(500).send('Failed to create buyer'));
     //console.log(`Username: ${username}, Password: ${password}`);
     }
     catch(err){
       console.log(err);
     }
    }

});

app.listen(3002, () => {
  console.log('Server listening on port 3002!');
});





