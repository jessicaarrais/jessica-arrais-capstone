require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));

/* 
  Response format { id, email, iat }
*/
exports.getCurrentUser = async (req, res) => {
  if (req.validatedToken) res.json(req.validatedToken);
};

/* 
  Response format { token }
*/
exports.signupUser = async (req, res) => {
  try {
    const { username, first_name, last_name, phone, email, password } =
      req.body;

    if (
      !username.trim() ||
      !first_name.trim() ||
      !last_name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !password.trim()
    )
      return res.status(400).send("Invalid password format.");

    bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
      async (_err, hash) => {
        const id = crypto.randomUUID();
        await knex("users").insert({
          ...req.body,
          id,
          password: hash,
        });

        const token = jwt.sign(
          { id, email: req.body.email },
          process.env.JWT_KEY
        );

        res.status(201).location(`/api/users/${id}`).send({ token });
      }
    );
  } catch (err) {
    res.status(400).send(`Failed signing up. Error: ${err}`);
  }
};

/* 
  Response format { token }
*/
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

/* 
  Response format [{ id, first_name, last_name, email }]
*/
exports.getUsers = async (_req, res) => {
  try {
    const users = await knex
      .select("id", "first_name", "last_name", "email")
      .from("users");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send(`My get: Error retrieving users: ${err}`);
  }
};

/* 
  Response format [
    { username, first_name, last_name, email, has_privileges}, 
    { id, user_id, 
      address, city, state, country, area, price, fees, availability, bedrooms, 
      bathrooms, description, features, amenities, pictures, created_at, updated_at 
    }
  ]
*/
exports.getUser = async (req, res) => {
  try {
    const user = await knex
      .select(
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "has_privileges"
      )
      .from("users")
      .where({ "users.id": req.params.userId });

    let properties;
    if (user[0].has_privileges) {
      properties = await knex("properties").where({ user_id: user[0].id });

      return res.status(200).json([user[0], ...properties]);
    }
    res.status(200).json([user[0]]);
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
