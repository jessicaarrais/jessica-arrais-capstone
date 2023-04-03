/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("properties", (table) => {
    table.uuid("id").primary();
    table
      .uuid("user_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("country").notNullable();
    table.string("area").notNullable();
    table.string("price").notNullable();
    table.string("fees").notNullable();
    table.string("availability").notNullable();
    table.string("bedrooms").notNullable();
    table.string("bathrooms").notNullable();
    table.string("description").notNullable();
    table.string("features").notNullable();
    table.string("amenities").notNullable();
    table.string("type").notNullable();
    table.boolean("pets").notNullable();
    table.string("pictures").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("properties");
};
