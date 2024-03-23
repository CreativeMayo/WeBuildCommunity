const mongoose = require('mongoose');

// Define the CPU schema with fields for consciousness, personalUnconscious, and collectiveUnconscious
const cpuSchema = new mongoose.Schema({
  consciousness: { type: String, required: true },
  personalUnconscious: { type: String, required: true },
  collectiveUnconscious: { type: String, required: true }
});

// Export the CPU schema so it can be used in the Person model
module.exports = cpuSchema;