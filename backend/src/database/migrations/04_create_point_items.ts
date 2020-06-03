import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', table => {
    table.bigIncrements('id').primary();
    table.bigInteger('point_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('points');

    table.bigInteger('item_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('items');
    
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('point_items');
}