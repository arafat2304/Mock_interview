const express = require('express');
const mongoose = require("mongoose");


const interviewSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    techStack: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    questions: {
        type: [String],
        required: true
    },
    answers: {               // <-- Add this field
        type: [String],
        default: []           // Initialize as empty array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    finalized:{
        type: Boolean,
        default: false
    }
});


const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;