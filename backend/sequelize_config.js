const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

class Database {
  constructor() {
    if (!Database.instance) {
      this._sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: false,
      });
      Database.instance = this;
    }
    return Database.instance;
  }

  getInstance() {
    return this._sequelize;
  }
}

const databaseInstance = new Database();
Object.freeze(databaseInstance);

module.exports = databaseInstance.getInstance();