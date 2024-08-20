const mongoose = require('mongoose');

const DefenseCallSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    enum: ['Mid', 'Final'], // Mid-term or Final defense
  },
  level: {
    type: String,
    required: true,
    enum: ['bachelors', 'masters'], // Bachelors or Masters level
  },
  faculty: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: function () {
      return this.level === 'bachelors'; // Only required for bachelors level
    },
    min: 1,
    max: 8,
  },
  subject: {
    type: String,
    required: function () {
      return this.level === 'bachelors'; // Only required for bachelors level
    },
  },
  defenseDate: {
    type: Date,
    required: true,
  },
  defenseTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DefenseCall', DefenseCallSchema);
