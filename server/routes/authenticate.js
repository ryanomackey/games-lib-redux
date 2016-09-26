'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');

router.post('/signup', function(req, res) {
  knex('users').where({email:req.body.email.toLowerCase()}).then(function(data) {
    if (data.length > 0) {
      res.json({message:'Email already exists.'});
    } else {
      bcrypt.hash(req.body.password, 10 , function(err, hash) {
        if (hash) {
          knex('users').insert({email: req.body.email.toLowerCase(), password: hash}).then(function() {
            res.json({message:'Account successfully created.'});
          });
        }
      });
    }
  });
});

router.post('/login', function(req, res) {
  knex('users').where({email:req.body.email.toLowerCase()}).then(function(data) {
    if (data.length) {
      bcrypt.compare(req.body.password, data[0].password, function(err, success) {
        if (success) {
          var profile = {
            id: data[0].id,
            email: data[0].email
          };
          var token = jwt.sign(profile, process.env.SECRET);
          res.json({token: token});
        } else {
          res.json('Incorrect email or password.');
        }
      });
    } else {
      res.json('No accounts listed under that email. Please try again.');
    }
  });
});

router.post('/logout', function(req, res) {
  res.end();
});

module.exports = router;
