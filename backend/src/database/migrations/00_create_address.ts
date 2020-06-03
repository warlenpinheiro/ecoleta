import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('address', table => {
    table.bigIncrements('id').primary();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.integer('number').notNullable();
    table.string('cep', 8).notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    table.string('logradouro').notNullable();
    table.string('bairro').notNullable();
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('address');
}