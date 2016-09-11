'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({
          giantbomb_id: 25249,
          name: 'Red Dead Redemption',
          image_url: 'http://www.giantbomb.com/api/image/scale_small/2737123-reddeadredemption.jpg',
          deck: "Red Dead Redemption is the spiritual successor to 2004's Red Dead Revolver, featuring a vibrant, open world set in the decline of the American Wild West. Players take on the role of former outlaw John Marston, who is forced to hunt down his former gang to regain his family."
        }),
        knex('games').insert({
          giantbomb_id: 2,
          name: 'rowValue2'
        }),
        knex('games').insert({
          giantbomb_id: 3,
          name: 'rowValue3'
        })
      ]);
    });
};
