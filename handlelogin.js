const express = require("express");
const router = express.Router();
const mongoUserSchema = require("./mongo.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
("joi-password-complexity");
const signupvalidate = require("./signup.js");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const jwtDecode = require("jwt-decode");
const yup = require("yup");

const Udatabase = mongoose.createConnection(
  "mongodb://localhost:27017/wdassignment",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const mongomodel = Udatabase.model("mongomodel", mongoUserSchema);

router.get("/", (req, res) => {
  //NOT SIGNUP MANN!

  mongomodel
    .find({ email: req.query.email })
    .exec()
    .then((currUser) => {
      if (!currUser) return res.status(400).send("Invalid email or password");
      return currUser[0];
    })
    .then((currUser) => {
      if (passwordIsCorrect(req, res, currUser)) {
        console.log(currUser);
        const token = jwt.sign(
          { email: currUser.email, isAdmin: currUser.isAdmin },
          "aPrivateKeyBro"
        );
        res.send(token);
        return; //REMOVE THIS RETURN MANN BEFORE PROCEDING
        //Open User Dashboard idk how react smthing
        //OpenDashboard(currUser);
      } else {
        res.status(400).send("Invalid email or password");
      }
    });
});

async function passwordIsCorrect(req, res, currUser) {
  // const validPassword = req.body.password.localeCompare(currUser.password);
  //await bcrypt.compare(req.body.password, currUser.password);
  // if(validPassword != 0) res.status(400).send('Invalid email or password');

  return true;
}

router.post("/", (req, res) => {
  if (!req.body.email.endsWith("@lnmiit.ac.in")) {
    return res
      .status(400)
      .send("Email should be mittal email! (@lnmiit.ac.in)");
  }

  const newuser = new mongomodel(req.body);

  signupvalidate(newuser)
    .then((vuser) => {
      newuser
        .save()
        .then((user) => res.send("User registered, check email for login!"))
        .then((user) => console.log("handlelogin part 2"))
        .catch((err) => res.send(err.errorResponse.errmsg));
    })
    .catch((err) => {
      res.send(err + "!");
    });
});

router.get("/getallusers", (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const currUser = jwt.verify(token, "aPrivateKeyBro");
    req.body = currUser;
  } catch (ex) {
    return res.status(400).send("Invalid token." + ex);
  }

  const curraUser = req.body;

  if (curraUser.isAdmin) {
    mongomodel
      .find({})
      .then((projects) => res.json(projects))
      .catch((err) => res.status(500).send("Server error"));
      return;
  } else {
    return res.send("You do not have the permission to view all users");
  }

});

module.exports = router;
