const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require("cors");
const { Int32 } = require("mongodb");
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
const reviewsmainDbConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
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
var link, location1, location2, username, buyer, arrival, departure, price, pname,OTP;
const mergeSchema = new mongoose.Schema({
  pname: String,
  link: String,
  username: String,
  location1: String,
  uploc:String,
  location2: String,
  Arrival: String,
  Departure: String,
  buyer: String,
  price: String,
  OTP:Number,
  status:String

});

const choicesSchema = new mongoose.Schema({
  username: String,
  product: String,
  link: String,
  pickup: String,
  drop: String,
  price: String

});
const buyerchoicesSchema = new mongoose.Schema({
  username: String,
  loc1: String,
  loc2: String,
  Departure: String,
  Arrival: String

});
const mainpagereviewsSchema = new mongoose.Schema({
  username: String,
  location: String,
  review: String

});

const User = userDbConnection.model('UserCredentials', userSchema);
const Buyer = BuyerDbConnection.model('BuyerCredentials', BuyerSchema);
const Choices = choicesDbConnection.model('UserChoices', choicesSchema);
const BuyerChoices = buyerchoicesDbConnection.model('BuyerChoices', buyerchoicesSchema);
const MergedData = choicesDbConnection.model('MergedData', mergeSchema);
const ReviewsMain = reviewsmainDbConnection.model('ReviewsMainPage', mainpagereviewsSchema);

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
reviewsmainDbConnection.on('connected', function () {
  console.log('Connected to reviews main database');
});
reviewsmainDbConnection.on('error', function (err) {
  console.log('Error connecting to reviews main database:', err.message);
});
app.post('/Login', async (req, res) => {
  try {
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
        uname = user.username;
        // Define an array of choices based on user input

      })
      .catch((err) => res.status(500).send('Failed to login'));
  }
  catch (err) {
    console.log(err);
  }
  // console.log(`Username: ${username}, Password: ${password}`);

});
app.post('/Merge', async (req, res) => {

  try {
    console.log(req.body.username)
    pname = req.body.pname;
    link = req.body.link;
    username = req.body.username;
    location1 = req.body.locBuyer;
    location2 = req.body.locUser;
    arrival = req.body.date1;
    departure = req.body.date2;
    buyer = req.body.buyer;
    price = req.body.price;
    const key = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
      OTP=key;
      console.log(OTP)
    const merged = new MergedData({
      pname: req.body.pname,
      link: req.body.link,
      username: req.body.username,
      location1: req.body.locBuyer,
      location2: req.body.locUser,
      Arrival: req.body.date1,
      Departure: req.body.date2,
      buyer: req.body.buyer,
      price: req.body.price,
      OTP:key,
      status:'inactive',
      uploc:req.body.locBuyer
    });
    await merged.save()
  }
  catch (err) {
    console.log(err);
  }
  // console.log(`Username: ${username}, Password: ${password}`);

});
app.post('/OTP',async(req,res)=>{
console.log(req.body.secretKey)
console.log(OTP)
res.send(OTP)



})
app.post('/UpdateLoc',async(req,res)=>{
  console.log(req.body.locup)
  
  
  
  })
app.post('/PostReview',async(req,res)=>{
  const review=new ReviewsMain({
    username:req.body.username,
    location:req.body.loc,
    review:req.body.content

  });
  await review.save();
})
app.post('/LoginBuyer', async (req, res) => {
  try {
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
        uname = user.username;
        // Define an array of choices based on user input

      })
      .catch((err) => res.status(500).send('Failed to login'));
  }
  catch (err) {
    console.log(err);
  }
  // console.log(`Username: ${username}, Password: ${password}`);

});

app.post('/Findmatch', async (req, res) => {
  const product = req.body.pname;
  const link = req.body.link;
  const pickup = req.body.locUser;
  const drop = req.body.locBuyer;
  const price = req.body.price;
  console.log(product);
  // Create a new document for the user's choices, using the extracted username field from UserCredentials
  const userChoices = new Choices({
    username: uname,
    product: product,
    link: link,
    pickup: pickup,
    drop: drop,
    price: price
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

app.post('/BuyerDetails', async (req, res) => {
  const username = req.body.username;
  const d1 = req.body.date1;
  const d2 = req.body.date2;
  const loc1 = req.body.loc1;
  const loc2 = req.body.loc2;
  console.log(loc1);
  // Create a new document for the user's choices, using the extracted username field from UserCredentials
  const buyerChoices = new BuyerChoices({
    username: username,
    Departure: d1,
    Arrival: d2,
    loc1: loc1,
    loc2: loc2
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
  console.log(req.body.username + " " + req.body.password);
  u = req.body.username;
  uname = u;
  const userExists = await User.findOne({ username: u });
  if (userExists) {
    return res.send({ error: 'User with email already exists' });
  }
  else {
    try {
      await newUser.save()
        .then(() => res.send('User created successfully'))
        .catch((err) => res.status(500).send('Failed to create user'));
      //console.log(`Username: ${username}, Password: ${password}`);
    }
    catch (err) {
      console.log(err);
    }
  }

});
app.post('/RegisterBuyer', async (req, res) => {
  const newUser = new Buyer({
    username: req.body.username,
    password: req.body.password
  });
  console.log(req.body.username + " " + req.body.password);
  u = req.body.username;
  uname = u;
  const userExists = await Buyer.findOne({ username: u });
  if (userExists) {
    return res.send({ error: 'Buyer with email already exists' });
  }
  else {
    try {
      await newUser.save()
        .then(() => res.send('Buyer created successfully'))
        .catch((err) => res.status(500).send('Failed to create buyer'));
      //console.log(`Username: ${username}, Password: ${password}`);
    }
    catch (err) {
      console.log(err);
    }
  }

});
app.post('/chart-data',async(req,res)=>{
 const data= {
    "labels": ["January", "February", "March", "April", "May", "June", "July"],
    "dataset1": [10, 20, 30, 40, 50, 60, 70],
    "dataset2": [70, 60, 50, 40, 30, 20, 10]
  }
  res.json(data)
  
})
app.post('/dataTable', async (req, res) => {
  const data = [
    {
      "id": 1,
      "pname": "Product 1",
      "price": 10.99,
      "status": "active"
    },
    {
      "id": 2,
      "pname": "Product 2",
      "price": 15.99,
      "status": "inactive"
    },
    {
      "id": 3,
      "pname": "Product 3",
      "price": 20.99,
      "status": "active"
    },
    {
      "id": 4,
      "pname": "Product 4",
      "price": 25.99,
      "status": "inactive"
    }
  ];
  res.json(data);
});
app.post('/reviewTable', async (req, res) => {
  const data = [
    {
      "id": 1,
      "pname": "Product 1",
      "price": 10.99,
      "status": "active"
    },
    {
      "id": 2,
      "pname": "Product 2",
      "price": 15.99,
      "status": "inactive"
    },
    {
      "id": 3,
      "pname": "Product 3",
      "price": 20.99,
      "status": "active"
    },
    {
      "id": 4,
      "pname": "Product 4",
      "price": 23.99,
      "status": "inactive"
    }
  ];
  res.json(data);
});
app.post('/Verify',async(req,res)=>{
  console.log(req.body.otp);
  console.log(req.body.otp)
  console.log(OTP)
  if(req.body.otp===OTP){
    const dataExists = await MergedData.findOne({
      OTP:req.body.otp})
      if (dataExists) {
        dataExists.status='active';
        dataExists.save()
        console.log("Status updated")
      }
      else {
        console.log("Status update failed")
      }
  res.send('Verified')}
  else{
    res.send("Incorrect")
  }
})
app.post('/xyz', async (req, res) => {
  const dataExists = await MergedData.findOne({
    pname: pname,
    link: link,
    username: username,
    location1: location1,
    location2: location2,
    Arrival: arrival,
    Departure: departure,
    buyer: buyer
  });
  if (dataExists) {
    res.send(dataExists);
  }
  else {
    console.log("Merged data fail")
  }

});

app.get('/', async (req, res) => {
  try {
    const reviews = await ReviewsMain.find();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


app.listen(3002, () => {
  console.log('Server listening on port 3002!');
});





