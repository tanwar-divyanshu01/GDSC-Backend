//THIS IS GETALLPROJECTS FOR ALL USERS!

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require('./auth.js');
const { find } = require('lodash');
const projectSchema = require('./projectmodel');
const jwt = require('jsonwebtoken');

router.use(express.json());

const Pdatabase = mongoose.createConnection('mongodb://localhost:27017/gdscprojects', { useNewUrlParser: true, useUnifiedTopology: true });

const projectmodel = Pdatabase.model('projectmodel', projectSchema);

router.get('/', (req, res)=>{

    //---------------------------------------
    const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try{
		const currUser = jwt.verify(token, 'aPrivateKeyBro');
        req.body = currUser;
	}
	catch (ex) {
		return res.status(400).send('Invalid token.' + ex);
	}
    //----------------------------------------

    const curraUser = req.body;

    if(curraUser.isAdmin){
        projectmodel.find({})
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send('Server error'));
    } else{
        projectmodel.find({email: curraUser.email })
            .then(projects => res.json(projects))
            .catch(err => res.status(500).send('Server error'));
    }
});

router.post('/', (req, res)=> {

    //---------------------------------------
    const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try{
		const decoded = jwt.verify(token, 'aPrivateKeyBro');
        req.body.email = decoded.email;
        console.log(decoded);
	}
	catch (ex) {
		res.status(400).send('Invalid token.' + ex);
	}
    //----------------------------------------

    const savingprojectnow = new projectmodel(req.body);

    savingprojectnow.save()
        .then(project => res.send(project))
        .then(user => console.log('projectdb part 1'))
        .catch(err => res.send(err.errorResponse.errmsg));


    //NOW PRINT SAVED USING REACT
});

router.put('/', (req, res)=>{

    //check if the ._id is working nice or not
    const prid = req.body._id;

    projectmodel.findOneAndUpdate({_id: prid}, req.body)
        .then(project => res.send(project))
        .catch(err => res.status(500).send(err));
});

router.delete('/', (req, res)=>{

    projectmodel.deleteOne({_id: req.body._id})
        .then(project => req.send(project))
        .catch(err => res.status(500).send(err));

});

module.exports = router;