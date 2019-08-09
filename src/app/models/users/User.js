const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Database = require('../../../databases');

const { sequelize, Sequelize } = Database.sequelize;

const DatasetUser = require('./DatasetUser');

class User extends Sequelize.Model {
  passwordCompare(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 604800,
    });
  }
}
User.init(
  {
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: { isEmail: true },
    },
    password: Sequelize.VIRTUAL,
    password_hash: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    first_login: Sequelize.BOOLEAN,
  },
  { sequelize, modelName: 'users', tableName: 'users' }
);

User.addHook('beforeCreate', async user => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

/**
 * Assosiations with DATASET_USERS
 */
User.hasOne(DatasetUser, { as: 'dataset', foreignKey: 'user_id' });
DatasetUser.belongsTo(User, { as: 'users', foreignKey: 'user_id' });

module.exports = User;
