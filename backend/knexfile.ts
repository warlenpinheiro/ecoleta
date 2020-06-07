import path from "path";

module.exports = {
  client: 'mysql',
  version: '8.0.20',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'teste123',
    database : 'ecoleta'
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations")
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds")
  },
  useNullAsDefault: true
};
