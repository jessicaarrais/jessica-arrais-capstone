/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const usersData = require("./seed_data/users-data");
const propertiesData = require("./seed_data/properties-data");

exports.seed = async function (knex) {
  // Deletes and seeds users table
  await knex("users").del();
  await knex("users").insert(usersData);

  // Deletes and seeds users table
  await knex("properties").del();
  await knex("properties").insert(propertiesData);
};
