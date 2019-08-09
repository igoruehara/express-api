const faker = require('faker');
const { factory } = require('factory-girl');
const User = require('../../../app/models/users/User');

factory.define('UserFactory', User, {
  name: factory.seq('User.name', n => faker.name.findName()),
  email: factory.seq('User.email', n => faker.internet.email()),
  password: faker.internet.password,
});

module.exports = factory;
