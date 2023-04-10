const crypto = require("crypto");
const knex = require("knex")(require("../knexfile"));

exports.getAllProperties = async (_req, res) => {
  try {
    const data = await knex("properties");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`My get: Error retrieving properties: ${err}`);
  }
};

exports.getProperty = async (req, res) => {
  try {
    const data = await knex
      .select(["properties.*", "users.first_name", "users.email"])
      .from("properties")
      .leftJoin("users", function () {
        this.on("properties.user_id", "=", "users.id");
      })
      .where({ "properties.id": req.params.propertyId });
    res.status(200).send(data[0]);
  } catch (err) {
    res.status(400).send(`Error retrieving property: ${err}`);
  }
};

exports.addProperty = async (req, res) => {
  try {
    const id = crypto.randomUUID();
    await knex("properties").insert({ ...req.body, id });

    const properties = await knex
      .select("*")
      .from("properties")
      .where({ user_id: req.params.userId });

    res.status(201).location(`/api/properties/${id}`).send(properties);
  } catch (err) {
    res.status(400).send(`Error adding property: ${err}`);
  }
};

exports.updateProperty = async (req, res) => {
  try {
    await knex("properties")
      .update(req.body)
      .where({ id: req.params.propertyId });
    res.status(200).send("Property information updated");
  } catch (err) {
    res.status(400).send(`Error updating properties: ${err}`);
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await knex("properties").delete().where({ id: req.params.propertyId });
    const properties = await knex
      .select("*")
      .from("properties")
      .where({ user_id: req.params.userId });
    res.status(200).send(properties);
  } catch (err) {
    res.status(400).send(`Error deleting property: ${err}`);
  }
};
