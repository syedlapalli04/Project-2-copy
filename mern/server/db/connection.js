import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

// Set up the connection URI
const uri = process.env.ATLAS_URI || "";

// Connect to MongoDB using Mongoose
mongoose.connect(uri);

const db = mongoose.connection;

// Handle connection events
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB with Mongoose!");
});

// Export the connection (optional) and mongoose itself
export default mongoose;