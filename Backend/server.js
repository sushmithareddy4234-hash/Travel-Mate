require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

/* ================== DATABASE ================== */

mongoose.connect("mongodb://127.0.0.1:27017/travelmate")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================== MODELS ================== */

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const TripSchema = new mongoose.Schema({
  email: String,
  place: String,
  budget: String,
  days: Number,
});

const User = mongoose.model("User", UserSchema);
const Trip = mongoose.model("Trip", TripSchema);

/* ================== AUTH ================== */

// SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ message: "User already exists" });
  }

  await User.create({ email, password });
  res.json({ message: "Signup successful" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

/* ================== TRIPS ================== */

// ADD TRIP
app.post("/add-trip", async (req, res) => {
  const { email, place, budget, days } = req.body;

  await Trip.create({ email, place, budget, days });

  res.json({ message: "Trip added" });
});

// GET TRIPS
app.get("/my-trips/:email", async (req, res) => {
  const trips = await Trip.find({ email: req.params.email });
  res.json(trips);
});

/* ================== AI PLAN ================== */

app.post("/generate-plan", async (req, res) => {
  const { place, budget, days } = req.body;

  try {
    console.log("Generating plan for:", place, budget, days);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
You are an expert travel planner.

Create a detailed ${days}-day travel itinerary for ${place} within a budget of ₹${budget}.

FORMAT STRICTLY LIKE THIS:

Introduction:
(A short 2-3 line intro about the place)

Day 1:
- Morning:
- Afternoon:
- Evening:

Day 2:
- Morning:
- Afternoon:
- Evening:

(continue till Day ${days})

Budget Breakdown:
- Accommodation:
- Food:
- Transport:
- Activities:
- Miscellaneous:
- Total:

Tips and Recommendations:
- Tip 1
- Tip 2
- Tip 3

IMPORTANT:
- Do NOT use ** or stars
- Keep it clean and readable
- Include realistic Indian prices (₹)
- Make it slightly detailed
            `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const plan = response.data.choices[0].message.content;

    res.json({ plan });

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

/* ================== SERVER ================== */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});