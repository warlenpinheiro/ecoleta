import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password', 128).notNullable();
    table.integer('type').notNullable();
    table.string('fone').notNullable();
    table.bigInteger('address_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('address');
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('users');
}