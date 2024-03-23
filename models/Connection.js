const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming Person model has been defined in Person.js
const personSchema = require('./Person').schema;

const connectionSchema = new Schema({
  person: { 
    type: Schema.Types.ObjectId, 
    ref: 'Person' 
  },
  thing: { 
    type: String 
  },
  type: { 
    type: String, 
    enum: ['Internal', 'External'], 
    required: true 
  }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;