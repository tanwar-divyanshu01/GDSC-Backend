//THIS IS GETALLPROJECTS FOR ADMINS!

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require('./auth.js');
const { find } = require('lodash');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/gdscprojects');

router.get('/', auth, (req, res)=>{
    const userEmail = req.user.email;

    //find all in database
    Project.find({ email })
        .then(projects => res.json(projects))
        .catch(err => res.status(500).send('Server error'));
});

module.exports = router;