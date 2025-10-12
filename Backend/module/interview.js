const express = require('express');
const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: { type: String, required: true },
  level: { type: String, required: true },
  techStack: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },

  questions: { type: [String], required: true },
  aiAnswers:{type:[String],required:true},
  answers: { type: [String], default: [] },

  score: { type: Number, default: 0 },
  feedback: { type: String, default: "" },

  questionFeedback: {
    type: [
      {
        question: { type: String, default: "" },
        answer: { type: String, default: "" },
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" }
      }
    ],
    default: []
  },

  createdAt: { type: Date, default: Date.now },
  finalized: { type: Boolean, default: false }
});



const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;