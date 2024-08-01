const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const lodash = require('lodash');

const projectSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    pname: {
        type: String,
        required: true,
    },
    gitrepo: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    link: String,
    techstack: String,
});

module.exports = projectSchema;