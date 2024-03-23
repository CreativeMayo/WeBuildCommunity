const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming Person model has been defined in Person.js
const personSchema = require('./Person').schema;

const fieldSchema = new Schema({
  person1: { 
    type: Schema.Types.ObjectId, 
    ref: 'Person', 
    required: true 
  },
  person2: { 
    type: Schema.Types.ObjectId, 
    ref: 'Person', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Internal', 'External'], 
    required: true 
  },
  sharedNarratives: [{
    type: String
  }]
});

fieldSchema.pre('save', function(next) {
  console.log(`Saving field with person1 ID: ${this.person1} and person2 ID: ${this.person2}`);
  next();
});

fieldSchema.post('save', function(doc, next) {
  console.log(`Field saved with ID: ${doc._id}`);
  next();
});

fieldSchema.post('save', function(error, doc, next) {
  if (error) {
    console.error(`Error saving field: ${error.message}`, error.stack);
    next(error);
  } else {
    next();
  }
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;