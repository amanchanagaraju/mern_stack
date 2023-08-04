const mongodb = require("mongodb");

const mongoURL =
  "mongodb+srv://nagarajuamancha8:QNIRyn1VwWJRmn0P@cluster0.zs14icf.mongodb.net/?retryWrites=true&w=majority";
const dbName = "mern";

const sampleData = [
  { name: "John Doe", age: 30, email: "john@example.com" },
  { name: "Jane Smith", age: 25, email: "jane@example.com" },
  { name: "Bob Johnson", age: 35, email: "bob@example.com" },
];

async function connectToMongoDB() {
  try {
    const client = await mongodb.MongoClient.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");

    const db = client.db(dbName);

    // Insert sample data into the database
    const collection = db.collection("users");
    await collection.insertMany(sampleData);
    console.log("Sample data inserted successfully");

    // Close the MongoDB connection when the app exits
    process.on("SIGINT", () => {
      client.close();
      process.exit();
    });

    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    throw err;
  }
}

async function startServer() {
  const db = await connectToMongoDB();

  // Create and configure your Express app
  const express = require("express");
  const app = express();
  const PORT = 3000;

  // Add your routes and other middleware here

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
