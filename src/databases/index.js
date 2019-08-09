const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const sequelizeConfig = require('../config/database');

class Database {
  constructor() {
    this.sequelize = this.sequelizeConnection();
    this.mongodb = this.mongooseConnection();
  }

  sequelizeConnection() {
    return { Sequelize, sequelize: new Sequelize(sequelizeConfig) };
  }

  mongooseConnection() {
    const host = process.env.MONGOOSE_HOST;
    const port = process.env.MONGOOSE_PORT;
    const db = process.env.MONGOOSE_DATABASE;
    const authSource = process.env.MONGOOSE_AUTH_SOURCE;

    return mongoose.connect(
      `mongodb://${host}:${port}/${db}?authSource=${authSource}`,
      {
        user: process.env.MONGOOSE_USER,
        pass: process.env.MONGOOSE_PASSWORD,
        useNewUrlParser: true,
        useFindAndModify: true,
      }
    );
  }
}

module.exports = new Database();
