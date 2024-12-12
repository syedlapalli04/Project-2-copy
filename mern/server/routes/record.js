import express from "express";
import Record from "../models/Record.js"; // Import the Mongoose model

const router = express.Router();

// Get all records
router.get("/", async (req, res) => {
  try {
    const records = await Record.find(); // Use Mongoose to fetch all documents
    res.status(200).send(records);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching records" });
  }
});

// Get a record by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id); // Use Mongoose's `findById`
    if (!record) return res.status(404).send("Record not found");
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error fetching the record" });
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const newRecord = new Record(req.body); // Create a new instance of the model
    const savedRecord = await newRecord.save(); // Save it to the database
    res.status(201).send(savedRecord);
  } catch (err) {
    //console.error(err);
    //res.status(500).send({ error: "Error creating the record" });
    if (err.name === "ValidationError") {
      // Send validation error details to the front end
      res.status(400).send({ error: err.message, details: err.errors });
    } else {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

// Update a record by ID
router.patch("/:id", async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body, // Fields to update
      { new: true, runValidators: true } // Return updated document & validate changes
    );
    if (!updatedRecord) return res.status(404).send("Record not found");
    res.status(200).send(updatedRecord);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating the record" });
  }
});

// Delete a record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id); // Use `findByIdAndDelete`
    if (!deletedRecord) return res.status(404).send("Record not found");
    res.status(200).send({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error deleting the record" });
  }
});

export default router;
