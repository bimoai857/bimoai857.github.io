import { Knex } from 'knex';

const TABLE_NAME = 'users';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string('first_name',50).notNullable();
    table.string('last_name',50).notNullable();
    table.string('user_name',50).notNullable().unique();
    table.string('password',250).notNullable();
    table.decimal('latitude',10,8).notNullable().defaultTo(0);
    table.decimal('longitude',11,8).notNullable().defaultTo(0);
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}