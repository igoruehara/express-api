const Database = require('../../../databases');

const { sequelize, Sequelize } = Database.sequelize;

const User = require('./User');

class DatasetUser extends Sequelize.Model {}

DatasetUser.init(
  {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    cpf: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        max: 99999999999,
        not: ['[a-z]', 'i'],
      },
    },
    cnpj: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        max: 99999999999999,
        not: ['[a-z]', 'i'],
      },
    },
    cep: {
      type: Sequelize.STRING,
      validate: {
        max: 99999999,
        not: ['[a-z]', 'i'],
      },
    },
  },
  {
    sequelize,
    modelName: 'datasetUsers',
    tableName: 'dataset_users',
  }
);

module.exports = DatasetUser;
