import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('points', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.string('whatsapp').notNullable();
    table.string('email').notNullable();
    table.bigInteger('address_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('address');
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('points');
}