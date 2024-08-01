//I have to create mongoose
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const handlelogin = require('./handlelogin.js');
const projectdb = require('./projectdb.js');
const sample = require('./sample.js');

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());
app.use(cors());
app.use('/login', handlelogin);
app.use('/sample', sample)
app.use('/projects', projectdb);





