const express = require("express");
const {
  register,
  login,
  getUsers,
  deleteUsers,
} = require("../../controller/users/user");
const router = require("express").Router();
router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);
router.delete("/:id", deleteUsers);

module.exports = router;
