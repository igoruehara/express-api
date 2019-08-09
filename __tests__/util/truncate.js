const User = require('../../src/app/models/users/User');
const DatasetUser = require('../../src/app/models/users/DatasetUser');

const cleanDatabase = async () => {
  User.destroy({ truncate: true, force: true });
  DatasetUser.destroy({ truncate: true, force: true });
};

module.exports = cleanDatabase;
