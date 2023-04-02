require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

exports.getCurrentUser = async (req, res) => {
  if (req.validatedToken) res.status(200).json(req.validatedToken);
};

exports.signupUser = async (req, res) => {
  try {
    const { password } = req.body;

    bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
      async (_err, hash) => {
        const id = crypto.randomUUID();
        const user = await knex("users").insert({
          ...req.body,
          id,
          password: hash,
        });

        const token = jwt.sign(
          { id: user[0].id, email: user[0].email },
          process.env.JWT_KEY
        );

        res.status(201).location(`/api/users/${id}`).send({ token });
      }
    );
  } catch (err) {
    res.status(400).send(`Failed signing up. Error: ${err}`);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await knex("users").where({ email });
    if (!user.length)
      return res
        .status(400)
        .send("Failed logging in. Email or password not found.");

    const isPWCorrect = bcrypt.compareSync(password, user[0].password);
    if (!isPWCorrect)
      return res.send("Failed logging in. Email or password not found.");

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_KEY
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).send("Failed logging in. Email or password not found.");
  }
};

exports.getUsers = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`My get: Error retrieving users: ${err}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await knex
      .select("*")
      .from("users")
      .leftJoin("properties", function () {
        this.on("users.id", "=", "properties.user_id");
      })
      .where({ "users.id": req.params.userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(`Error retrieving user: ${err}`);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await knex("users").update(req.body).where({ id: req.params.userId });
    res.status(200).json("User information updated");
  } catch (err) {
    res.status(400).send(`Error updating user: ${err}`);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await knex("users").delete().where({ id: req.params.userId });
    res.status(200).json(`User ${req.params.userId} successfully deleted.`);
  } catch (err) {
    res.status(400).send(`Error deleting user: ${err}`);
  }
};
