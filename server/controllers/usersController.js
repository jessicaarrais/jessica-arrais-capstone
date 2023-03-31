const crypto = require("crypto");
const knex = require("knex")(require("../knexfile"));

exports.getUsers = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(`My get: Error retrieving users: ${err}`);
  }
};

exports.getUser = async (req, res) => {
  try {
    await knex
      .select("*")
      .from("users")
      .leftJoin("properties", function () {
        this.on("users.id", "=", "properties.user_id");
      })
      .where({ "users.id": req.params.userId });
    res.status(200).send("User retrieved");
  } catch (err) {
    res.status(400).send(`Error retrieving user: ${err}`);
  }
};

exports.addUser = async (req, res) => {
  try {
    //TODO: check if the req body contains a valid User object.
    const id = crypto.randomUUID();
    console.log(req.body);
    await knex("users").insert({ ...req.body, id });

    const newPropertURL = `/api/users/${id}`;
    res.status(201).location(newPropertURL).send(newPropertURL);
  } catch (err) {
    res.status(400).send(`Error adding user: ${err}`);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await knex("users").update(req.body).where({ id: req.params.userId });
    res.status(200).send("User information updated");
  } catch (err) {
    res.status(400).send(`Error updating user: ${err}`);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await knex("users").delete().where({ id: req.params.userId });
    res.status(200).send(`User ${req.params.userId} successfully deleted.`);
  } catch (err) {
    res.status(400).send(`Error deleting user: ${err}`);
  }
};
