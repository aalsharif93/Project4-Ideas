const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//get back all users
router.get('/',(req,res)=>{
    User.find()
    .then(data =>{
        res.json(data)
    })
    .catch(err => res.json(err))
})


//Rigester

router.post("/register", (req, res) => {
    
    const newUser = req.body 
    console.log(newUser)
    User.findOne({ email: newUser.email })
      .then(user => {
        if (!user) {
          bcrypt.hash(newUser.password, 10, (err, hash) => {
            newUser.password = hash;
            User.create(newUser)
              .then(user => {
                res
                  .status(201)
                  .json(`user ${newUser.email} created successfully`);
              })
              .catch(err => res.status(400).send(err));
          });
        } else {
          res.status(400).send("email exists , please use a different email ");
        }
      })
      .catch(err => res.status(400).send(err));
  });
  //login
  router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            let payload = {
              id: user._id,
              email: user.email,
              nickname: user.nickname
            };
            let token = jwt.sign(payload, "blablablabla", {
              expiresIn: "24h"
            });
            res.status(200).json({ msg: "logged in successfully", token: token });
          } else {
            res.status(400).send("password is not correct");
          }
        } else {
          res.status(400).send("email not found");
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
  
  
  
  module.exports = router
  
  
  
  
  
  
  