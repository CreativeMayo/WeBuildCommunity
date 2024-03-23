const mongoose = require('mongoose');
const SET = require('./SET'); // Assuming the SET schema is already defined in 'models/SET.js'

// Define the Narrative schema
const narrativeSchema = new mongoose.Schema({
  content: { type: String, required: true },
  set: SET, // Embed the SET schema directly
  color: { type: String, required: true }
});

// Method to determine color based on the SET combination
narrativeSchema.methods.determineColor = function () {
  const { sensation, emotion, thought } = this.set;
  if (emotion && !thought && !sensation) return "#FF0000"; // Emotions (Red)
  if (!emotion && thought && !sensation) return "#0000FF"; // Thoughts (Blue)
  if (emotion && !thought && sensation) return "#FFA500"; // Sensations + Emotions (Orange)
  if (emotion && thought && !sensation) return "#800080"; // Emotions + Thoughts (Purple)
  if (!emotion && thought && sensation) return "#008000"; // Thoughts + Sensations (Green)
  if (emotion && thought && sensation) return "#808080"; // Sensations + Emotions + Thoughts (Gray)
  return "#FFFFFF"; // Default color if no SET is defined
};

// Apply the determineColor method before saving a narrative
narrativeSchema.pre('save', function (next) {
  this.color = this.determineColor();
  next();
});

const Narrative = mongoose.model('Narrative', narrativeSchema);

module.exports = Narrative;