const User = require("../../models/users/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
const register = async (req, res, next) => {
  try {
    const { name, password, permission } = req.body;
    if (!name || !password) {
      return res.status(400).send({ message: "please enter data" });
    }
    const user = await User.findOne({ name: name });
    if (user) {
      return res.status(400).send({ message: "user already exists" });
    }
    const newUser = await User.create({
      name,
      password,
      permission,
    });
    const createdUser = {
      name: newUser.name,
      permission: newUser.permission,
      isAdmin: newUser.isAdmin,
    };
    const token = createToken(newUser._id);
    return res.status(201).json({ data: createdUser, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name: name });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "password not exists" });
    }
    const createdUser = {
      name: user.name,
      permission: user.permission,
      isAdmin: user.isAdmin,
    };
    const token = createToken(user._id);
    return res.status(201).json({ data: createdUser, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("name _id isAdmin permission");
    //console.log(usersFilter);

    return res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });

    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUsers,
};
