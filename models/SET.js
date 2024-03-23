const mongoose = require('mongoose');

// Define the SET schema with boolean fields for sensation, emotion, and thought
const setSchema = new mongoose.Schema({
  sensation: { type: Boolean, required: true },
  emotion: { type: Boolean, required: true },
  thought: { type: Boolean, required: true }
});

// Export the SET schema so it can be used in the Person model
module.exports = setSchema;