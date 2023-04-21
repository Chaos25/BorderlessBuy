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
const buyerchoicesDbConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const mergeDetails = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
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
var link,location1,location2,username,buyer,arrival,departure,price,pname;
const mergeSchema = new mongoose.Schema({
  pname:String,
  link:String,
  username: String,
  location1:String,
  location2:String,
  Arrival:String,
  Departure:String,
  buyer:String,
  price:String
  
});

const choicesSchema = new mongoose.Schema({
  username: String,
  product: String,
  link:String,
  pickup:String,
  drop:String,
  price:String

});
const buyerchoicesSchema = new mongoose.Schema({
  username: String,
  loc1:String,
  loc2:String,
  Departure:String,
  Arrival:String

});

const User= userDbConnection.model('UserCredentials', userSchema);
const Buyer= BuyerDbConnection.model('BuyerCredentials', BuyerSchema);
const Choices = choicesDbConnection.model('UserChoices', choicesSchema);
const BuyerChoices = buyerchoicesDbConnection.model('BuyerChoices', buyerchoicesSchema);
const MergedData = choicesDbConnection.model('MergedData', mergeSchema);

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
buyerchoicesDbConnection.on('connected', function () {
  console.log('Connected to buyer choices database');
});
buyerchoicesDbConnection.on('error', function (err) {
  console.log('Error connecting to  buyer choices database:', err.message);
});
mergeDetails.on('connected', function () {
  console.log('Connected to merged database');
});
mergeDetails.on('error', function (err) {
  console.log('Error connecting to merged database:', err.message);
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
app.post('/Merge', async(req, res) => {

  try{
   console.log(req.body.username)
   pname=req.body.pname;
   link=req.body.link;
    username= req.body.username;
    location1=req.body.locBuyer;
    location2=req.body.locUser;
    arrival=req.body.date1;
    departure=req.body.date2;
    buyer=req.body.buyer;
    price=req.body.price;
   const merged = new MergedData({
    pname:req.body.pname,
    link:req.body.link,
    username: req.body.username,
    location1:req.body.locBuyer,
    location2:req.body.locUser,
    Arrival:req.body.date1,
    Departure:req.body.date2,
    buyer:req.body.buyer,
    price:req.body.price
  });
  await merged.save()
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
        const price=req.body.price;
        console.log(product);
      // Create a new document for the user's choices, using the extracted username field from UserCredentials
      const userChoices = new Choices({
        username: uname,
        product:product,
        link:link,
        pickup:pickup,
        drop:drop,
        price:price
      });
  
      // Save the document to the UserChoices collection
      await userChoices.save()

    try {
      const docs = await BuyerChoices.find({ loc1: req.body.locBuyer, loc2: req.body.locUser }).exec();
      console.log(docs);
      res.send(docs);
    } catch (err) {
      // Handle the error here
      console.log(err);
      res.send("Buyer with given preferences not found");
    }
     
      })

      app.post('/BuyerDetails',async(req,res)=>{
        const username =req.body.username;
        const d1 =req.body.date1;
        const d2 =req.body.date2;
        const loc1 =req.body.loc1;
        const loc2 =req.body.loc2;
        console.log(loc1);
      // Create a new document for the user's choices, using the extracted username field from UserCredentials
      const buyerChoices = new BuyerChoices({
        username: username,
        Departure:d1,
        Arrival:d2,
        loc1:loc1,
        loc2:loc2
      });
  
      // Save the document to the UserChoices collection
      await buyerChoices.save()
      .then(() => res.send('Buyer details submitted'))
      .catch((err) => res.status(500).send('Buyer failed'));
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

app.post('/xyz', async (req, res) => {
const dataExists = await MergedData.findOne({ pname:pname,
  link:link,
  username: username,
  location1:location1,
  location2:location2,
  Arrival:arrival,
  Departure:departure,
  buyer:buyer });
    if (dataExists) {
      res.send(dataExists);
    }
    else{
     console.log("Merged data fail")
    }

});


app.listen(3002, () => {
  console.log('Server listening on port 3002!');
});





