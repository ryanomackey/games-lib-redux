'use strict';

var express = require('express');
var router = express.Router();
var http = require('http');

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
