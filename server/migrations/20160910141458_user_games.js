'use strict';
exports.up = function(knex) {
  return knex.schema.createTable('user_games', function(table) {
    table.increments();
    table.integer('user_id');
    table.integer('game_id');
    table.integer('platform_id');
    table.boolean('completed');
    table.boolean('own');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_games');
};
