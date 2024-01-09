import { Knex } from 'knex';

const TABLE_NAME = 'notification';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.bigInteger('notification_from');
    table.bigInteger('notification_to');
    table.bigInteger('swapbook_id').references('id').inTable('book').onDelete('CASCADE');
    table.boolean('notification_checked').notNullable().defaultTo(false);
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