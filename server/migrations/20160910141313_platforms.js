'use strict';
exports.up = function(knex) {
  return knex.schema.createTable('platforms', function(table) {
    table.increments();
    table.integer('giantbomb_id');
    table.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('platforms');
};
