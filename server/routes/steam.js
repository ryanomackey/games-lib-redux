'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/steam/return',
    realm: 'http://localhost:3000',
    apiKey: process.env.STEAM,
    passReqToCallback: true
  },
  function(req, identifier, profile, done) {
    console.log(req.body);
    return done(null, profile);
  }
));

router.get('/', passport.authenticate('steam'));

router.get('/return',
  passport.authenticate('steam', { failureRedirect: 'http://localhost:8000' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:8000/#/');
  });

module.exports = router;
