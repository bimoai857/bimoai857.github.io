import { Knex } from 'knex';

const TABLE_NAME = 'book';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string('title',50).notNullable();
    table.string('author',50);
    table.binary('image');
    table.text('description');
    table.bigInteger('user_id').references('id').inTable('users').onDelete('CASCADE');    
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