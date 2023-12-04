const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.index = (req, res) => {
  res.render('index');
};

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await user.save();
    req.session.user = user; // Almacena el usuario en la sesión
    res.redirect('/home');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(404).send('User not found.');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.user = user; // Almacena el usuario en la sesión
      res.redirect('/home');
    } else {
      res.status(401).send('Incorrect password.');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.home = (req, res) => {
  if (req.session.user) {
    res.render('home', { user: req.session.user });
  } else {
    res.redirect('/');
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.redirect('/');
  });
};