import { Knex } from "knex";

const TABLE_NAME = "tasks";

/**
 * Delete existing entries and seed values for table departments.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */

const TASKS = ["Laundry", "Data", "QA"];
const DESCRIPTION = ["At 5:00am", "At 6:00am", "At 7:00am"];

export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert(
        TASKS.map((task, idx) => ({
          id: idx + 1,
          name: task,
          description:DESCRIPTION[idx]
        }))
      );
    });
}
