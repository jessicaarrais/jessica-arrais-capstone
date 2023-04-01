/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("username").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.boolean("has_privileges").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
