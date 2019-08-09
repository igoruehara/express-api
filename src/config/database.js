require('./dotenv');

module.exports = {
  dialect: process.env.SEQUELIZE_DIALECT,
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.SEQUELIZE_HOST,
  operatorAliases: false,
  logging: false,
  storage: './__tests__/database/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
