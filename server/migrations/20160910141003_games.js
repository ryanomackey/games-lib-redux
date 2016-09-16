'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('games', function(table) {
    table.increments();
    table.integer('giantbomb_id');
    table.string('name');
    table.string('image_url');
    table.text('deck');
    table.string('release_date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
