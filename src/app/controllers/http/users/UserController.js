const User = require('../../../models/users/User');
const DatasetUser = require('../../../models/users/DatasetUser');
const UserSchema = require('../../../schemas/users/UserSchema');

const TestSendEmail = require('../../../jobs/TestSendEmail');
const Queue = require('../../../libs/Queue');

class UserController {
  async index(req, res) {
    const user = await User.findAll({
      include: [{ model: DatasetUser, as: 'dataset' }],
      attributes: ['id', 'name', 'email'],
    });
    return res.status(200).json(user);
  }

  async store(req, res) {
    const user = await User.create(req.body);
    const mongo = await UserSchema.create({
      email: user.email,
      user_id: user.id,
      user: user.dataValues,
    });

    Queue.add(TestSendEmail.key, {
      content: { name: user.name },
    });

    return res.status(200).json({ user, mongo });
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new UserController();
