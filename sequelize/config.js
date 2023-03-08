module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "test_sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize",
    "operatorsAliases": false
  }
}
