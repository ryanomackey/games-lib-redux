'use strict';

var express = require('express');
var router = express.Router();
var http = require('http');
var knex = require('../db/knex');

router.get('/single', function(req, res) {

  console.log(req.query);

  var query = encodeURI(req.query.game);

  var path = '/api/search/?api_key=' + process.env.GIANT_BOMB + '&format=json&limit=20&resources=game&query=' + query;

  var options = {
    hostname: 'www.giantbomb.com',
    path: path,
    method: 'GET',
    headers: {
      'User-Agent':'games-lib-react'
    }
  };

  function callback(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var parsed = JSON.parse(str);
      var game = parsed.results[0];
      knex('games').where({giantbomb_id:Number(game.id)})
        .then(function(result) {
          if(!result.length) {
            return knex('games').insert({
              giantbomb_id:game.id,
              steam_id: req.query.appid,
              name: game.name,
              image_url:game.image.small_url,
              deck:game.deck,
              release_date:game.original_release_date
            });
          }
        })
        .then(function() {
          knex('platforms').where({giantbomb_id:94})
          .then(function(result) {
            if(!result.length) {
              return knex('platforms').insert({
                giantbomb_id: 94,
                name:'PC'
              });
            }
          });
        })
        .then(function() {
          var userObj = {user_id:req.user.id, game_id:game.id, platform_id: 94, completed: false, own: true};
          knex('user_games').where(userObj).then(function(result) {
            if(!result.length) {
              return knex('user_games').insert(userObj);
            }
          });
        })
        .catch(function(error) {
          throw error;
        });
    });
    res.end();
  }

  http.request(options, callback).end();
});

router.get('/:id', function(req, res) {

  var path = '/IPlayerService/GetOwnedGames/v0001/?key=' + process.env.STEAM + '&steamid=' + req.params.id + '&include_appinfo=1&format=json';

  var options = {
    hostname: 'api.steampowered.com',
    path: path,
    method: 'GET',
    headers: {
      'User-Agent':'games-lib-react'
    }
  };

  function callback(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var parsed = JSON.parse(str);
      res.json(parsed.response.games);
    });
  }

  http.request(options, callback).end();
});

module.exports = router;
