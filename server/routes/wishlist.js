'use strict';

var express = require('express');
var router = express.Router();
var OperationHelper = require('apac').OperationHelper;
var parseString = require('xml2js').parseString;
var knex = require('../db/knex');

var opHelper = new OperationHelper({
    awsId:     process.env.AWS_ID,
    awsSecret: process.env.AWS_SECRET,
    assocId:   process.env.ASSOC_ID
});

router.get('/amazon', function(req,res) {
  knex('user_games').where({user_id:req.user.id,own:false})
  .leftJoin('games','game_id','games.giantbomb_id').column('games.name AS game_name','image_url AS game_image','deck AS game_deck','games.giantbomb_id AS game_id','games.steam_id AS game_steam_id','games.release_date AS game_release_date','user_games.completed','user_games.own')
  .leftJoin('platforms','platform_id','platforms.giantbomb_id').column('platforms.name AS platform_name', 'platforms.giantbomb_id AS platform_id')
  .orderBy('game_name','ASC')
  .then(function(data) {
    var actions = data.map((game) => {
      var str = game.game_name;
      var amazonQuery = opHelper.execute('ItemSearch', {
        'SearchIndex': 'VideoGames',
        'Keywords': str,
        'ResponseGroup': 'ItemAttributes,Offers'
      });
      return amazonQuery.then((response) => {
        return response.responseBody;
      });
    });
    var results = Promise.all(actions);
    results.then(function(data2) {
      var resultsData = [];
      for (var i = 0; i < data2.length; i++) {
        parseString(data2[i], function(err, result) {
          var url = result.ItemSearchResponse.Items[0].Item[0].DetailPageURL[0];
          var price;
          if (result.ItemSearchResponse.Items[0].Item[0].Offers[0].Offer) {
            price = result.ItemSearchResponse.Items[0].Item[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
          } else {
            price = null;
          }
          resultsData.push({
            itemURL: url,
            price: price
          });
        });
      }
      for (var j = 0; j < data.length; j++) {
        data[j].amazon_url = resultsData[j].itemURL;
        data[j].amazon_price = resultsData[j].price;
      }
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
      res.json({error:err});
    });
  })
  .catch(function(err) {
    console.log(err);
    res.json({error: err});
  });
});

module.exports = router;
