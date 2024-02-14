const express = require("express");
const router = new express.Router();
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async function (req, res) {
  const { payment_method, amount, currency } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency,
      description: "Main St. Coffee",
      payment_method,
      confirm: true,
    });

    console.log("Payment", payment);

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

module.exports = router;
