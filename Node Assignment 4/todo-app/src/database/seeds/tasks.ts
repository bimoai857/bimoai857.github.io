import { Knex } from "knex";

const TABLE_NAME = "tasks";

/**
 * Delete existing entries and seed values for table departments.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */


export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Laundry',
          description:'At 5:00pm'
        },
        {
          title:'Algebra',
          description:'At 1:00pm'
        },
        {
          title:'Calculus',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Laundry',
          description:'At 5:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        {
          title:'Cricket',
          description:'At 1:00pm'
        },
        {
          title:'Football',
          description:'At 2:00pm'
        },
        {
          title:'Tennis',
          description:'At 3:00pm'
        },
        
      ]
      );
    });
}
