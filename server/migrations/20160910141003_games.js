'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('games', function(table) {
    table.increments();
    table.integer('giantbomb_id');
    table.string('name');
    table.string('image_url');
    table.string('deck');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
