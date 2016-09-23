'use strict';

var express = require('express');
var router = express.Router();
var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var parseString = require('xml2js').parseString;
var querystring = require('querystring');

var opHelper = new OperationHelper({
    awsId:     process.env.AWS_ID,
    awsSecret: process.env.AWS_SECRET,
    assocId:   process.env.ASSOC_ID
});

router.get('/', function(req,res) {
  var str = querystring.unescape(req.query.q);
  opHelper.execute('ItemSearch', {
    'SearchIndex': 'VideoGames',
    'Keywords': str,
    'ResponseGroup': 'ItemAttributes,Offers'
    }).then((response) => {
      var xml = response.responseBody;
      parseString(xml, function (err, result) {
        var itemURL = result.ItemSearchResponse.Items[0].Item[0].DetailPageURL;
        var price = result.ItemSearchResponse.Items[0].Item[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice;
        res.json({itemURL: itemURL, price: price});
      });
    }).catch((err) => {
      console.error("Something went wrong! ", err);
  });
});



module.exports = router;
