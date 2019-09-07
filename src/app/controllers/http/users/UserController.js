const User = require('../../../models/users/User');
const DatasetUser = require('../../../models/users/DatasetUser');
const UserSchema = require('../../../schemas/users/UserSchema');

const TestSendEmailJob = require('../../../jobs/TestSendEmailJob');

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      include: [{ model: DatasetUser, as: 'dataset' }],
      attributes: ['id', 'name', 'email'],
    });

    TestSendEmailJob.init(
      'nameJob',
      { name: 'William' },
      {
        priority: 10,
        attempts: 3,
        delay: 2000,
        timeout: 10000,
      }
    ).status();

    return res.status(200).json(user);
  }

  async store(req, res) {
    const user = await User.create(req.body);
    const mongo = await UserSchema.create({
      email: user.email,
      user_id: user.id,
      user: user.dataValues,
    });

    return res.status(200).json({ user, mongo });
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new UserController();
