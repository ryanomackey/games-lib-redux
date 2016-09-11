'use strict';

var express = require('express');
var router = express.Router();
var http = require('https');

router.get('/search', function(req, res) {

  var query = encodeURI(req.query.query);

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
      res.json(parsed);
    });
  }

  http.request(options, callback).end();

});

module.exports = router;
