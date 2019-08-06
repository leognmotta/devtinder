const { default: axios } = require('axios');
const Dev = require('../models/Dev');

exports.index = async (req, res, next) => {
  try {
    const dev = await Dev.find();

    return res.json(dev);
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    console.log({ name, username, bio, avatar });

    const dev = await Dev.create({ name, user: username, bio, avatar });

    console.log(dev);

    return res.json({ dev });
  } catch (error) {
    next(error);
  }
};
