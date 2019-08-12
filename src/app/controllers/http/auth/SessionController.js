const User = require('../../../models/users/User');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: 'User not found' });

    if (!(await user.passwordCompare(password)))
      return res.status(401).json({ message: 'Invalid password' });

    const { name, active, first_login } = user;
    const token = User.generateToken(user);

    return res.status(200).json({ name, email, active, first_login, token });
  }
}

module.exports = new SessionController();
