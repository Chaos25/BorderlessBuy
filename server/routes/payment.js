require("dotenv").config();
const express = require("express");
const mongoose=require('mongoose')
const Razorpay = require("razorpay");
const crypto=require('crypto')
const router = express.Router();
const userTransactionConnection = mongoose.createConnection('mongodb+srv://riddhi:admin@cluster0.whbfyoh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const orderSchema = new mongoose.Schema({
    TransactionID: String,
    Amount: String
  });
  const Order= userTransactionConnection.model('UserOrders', orderSchema);
  userTransactionConnection.on('connected', function () {
    console.log('Connected to Transaction database');
  });
  userTransactionConnection.on('error', function (err) {
    console.log('Error connecting to transaction database:', err.message);
  });
router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.SECREAT_KEY,
        });

        const options = {
            amount: req.body.amt, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        const userOrders = new Order({
          TransactionID:razorpayOrderId,
          Amount:40
          });
      
          // Save the document to the UserChoices collection
          await userOrders.save()
          .then(() => res.write('Order submitted'))
          .catch((err) => res.write('Order failed'));
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "rzp_test_TCiJRG5nyb2oCu");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.write( "Transaction not legit!");

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

       
    } catch (error) {
        console.log(error);
    }
});
module.exports=router