import knex from "knex";
import path from "path";

const connection = knex({
  client: 'mysql',
  version: '8.0.20',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'teste123',
    database : 'ecoleta'
  },
  useNullAsDefault: true
});
export default connection;
