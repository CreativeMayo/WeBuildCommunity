const mongoose = require('mongoose');
const SET = require('./SET'); // Import the SET schema
const CPU = require('./CPU'); // Import the CPU schema

const personSchema = new mongoose.Schema({
  focus: { type: String, required: true },
  set: SET, // Embed the SET schema
  cpu: CPU, // Embed the CPU schema
  acceptanceType: { 
    type: String, 
    required: true, 
    enum: ['HA', 'LA'] // Making sure acceptanceType is either 'HA' or 'LA'
  },
  acceptanceRate: { type: Number, required: true }
});

// Method to determine if a user decides to share a narrative
// For simplicity, we are just simulating a 50% chance of sharing
personSchema.methods.decidesToShare = function() {
  const decision = Math.random() > 0.5;
  console.log(`[Person] decidesToShare decision: ${decision}`);
  return decision;
};

// Method to determine the likelihood of accepting an interaction based on acceptance type
personSchema.methods.calculateAcceptanceLikelihood = function() {
  const likelihood = this.acceptanceType === 'HA' ? this.acceptanceRate : 1 - this.acceptanceRate;
  console.log(`[Person] calculateAcceptanceLikelihood for ${this.acceptanceType}: ${likelihood}`);
  return likelihood;
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;