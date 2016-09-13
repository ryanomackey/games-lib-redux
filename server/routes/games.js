'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('user_games').where({user_id:req.user.id})
  .leftJoin('games','game_id','games.giantbomb_id').column('games.name AS game_name','image_url AS game_image','deck AS game_deck','games.giantbomb_id AS game_id')
  .leftJoin('platforms','platform_id','platforms.giantbomb_id').column('platforms.name AS platform_name', 'platforms.giantbomb_id AS platform_id')
  .orderBy('game_name','ASC')
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    res.json({error: err});
  });
});

router.post('/', function(req, res) {
  var game = req.body;
  knex('games').where({giantbomb_id:game.game_id})
    .then(function(result) {
      if(!result.length) {
        return knex('games').insert({giantbomb_id:game.game_id,name: game.game_name,image_url:game.game_image,deck:game.game_deck});
      }
    })
    .then(function() {
      knex('platforms').where({giantbomb_id:game.platform_id})
      .then(function(result) {
        if(!result.length) {
          return knex('platforms').insert({giantbomb_id:game.platform_id,name:game.platform_name});
        }
      });
    })
    .then(function() {
      var userObj = {user_id:req.user.id, game_id:game.game_id, platform_id:game.platform_id};
      knex('user_games').where(userObj).then(function(result) {
        if(!result.length) {
          return knex('user_games').insert(userObj);
        }
      });
    })
    .catch(function(error) {
      throw error;
    });
  res.end();
});

module.exports = router;
