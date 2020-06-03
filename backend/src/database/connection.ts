import knex from 'knex';

const connection = knex({
  client: 'mysql',
  version: '8.0.20',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'teste123',
    database : 'ecoleta'
  }
});

export default connection;