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
    //TODO: check if the req body contains a valid property object.
    console.log(req.body);
    const id = crypto.randomUUID();
    await knex("properties").insert({ ...req.body, id });

    const newPropertURL = `/api/properties/${id}`;
    res.status(201).location(newPropertURL).send(newPropertURL);
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
    res.status(200).send(`Property ${req.params.id} successfully deleted.`);
  } catch (err) {
    res.status(400).send(`Error deleting property: ${err}`);
  }
};
