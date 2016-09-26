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

passport.use(new SteamStrategy({
    returnURL: 'https://games-lib-dev.us-west-2.elasticbeanstalk.com/steam/return',
    realm: 'https://games-lib-dev.us-west-2.elasticbeanstalk.com',
    apiKey: process.env.STEAM
  },
  function(identifier, profile, done) {
    return done(null, profile);
  }
));

router.get('/', passport.authenticate('steam'));

router.get('/return',
  passport.authenticate('steam', { failureRedirect: 'https://games-lib.firebaseapp.com' }),
  function(req, res) {
    // Successful authentication, redirect home.
    var steamId = req.session.passport.user.id;
    res.redirect('https://games-lib.firebaseapp.com/#/' + '?steamImport=true&steamId=' + steamId);
  });

module.exports = router;
