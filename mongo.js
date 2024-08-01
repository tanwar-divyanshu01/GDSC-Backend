const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const lodash = require('lodash');

const mongoUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoUserSchema;