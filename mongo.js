const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const mongoURL =
  "mongodb+srv://amanchanagaraju32:DvjaY6d1vTlzNbJN@cluster0.jlqr9il.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add this option to suppress deprecation warning
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Sign-up route
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user to the database:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Sign-in route
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Sign in successful" });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Sign-in failed" });
  }
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  names: [{ type: String, required: true }],
});

const Course = mongoose.model("Course", courseSchema);

// Add a new course
app.post("/addCourse", async (req, res) => {
  const { title, names } = req.body;

  try {
    const newCourse = new Course({
      title,
      names,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully." });
  } catch (error) {
    console.error("Error adding course to the database:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
