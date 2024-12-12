import mongoose from "../db/connection.js";

const recordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  copies: { type: Number, min: 0, required: true },
  notes: { type: String },
  type: { type: String, enum: ["Fiction", "Non-Fiction"], required: true },
});

recordSchema.pre("save", function (next) {
    if (this.genre) {
      this.genre = this.genre.charAt(0).toUpperCase() + this.genre.slice(1).toLowerCase();
    }
    next();
  });

// Create a model based on the schema
const Record = mongoose.model("Record", recordSchema);

export default Record;
