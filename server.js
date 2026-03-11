const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studygenie")
.then(() => console.log("MongoDB Connected "))
.catch((err) => console.log(err));

// ✅ Schema
const planSchema = new mongoose.Schema({
  subject: String,
  examDate: Date,
  hoursPerDay: Number,
  daysLeft: Number,
  createdAt: { type: Date, default: Date.now }
});

const Plan = mongoose.model("Plan", planSchema);

// ✅ Generate Plan API
app.post("/generate", async (req, res) => {

  const { subject, examDate, hoursPerDay } = req.body;

  const today = new Date();
  const exam = new Date(examDate);

  const timeDiff = exam - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const newPlan = new Plan({
    subject,
    examDate,
    hoursPerDay,
    daysLeft
  });

  await newPlan.save();

  res.json({
    message: "Plan Generated Successfully ",
    daysLeft: daysLeft
  });

});

// ✅ Get All Plans API
app.get("/plans", async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});