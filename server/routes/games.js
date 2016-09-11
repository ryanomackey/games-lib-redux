'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.post('/', function(req, res) {
  knex('games').where({giantbomb_id:req.body.giantbomb_id})
  .then(function(result) {
    console.log(result);
  });
  res.json({message:'hit it'});
});

module.exports = router;
