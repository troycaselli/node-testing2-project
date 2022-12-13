/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('colors').truncate()
  await knex('colors').insert([
    {color: 'red', type: 'primary'},
    {color: 'yellow', type: 'primary'},
    {color: 'blue', type: 'primary'},
    {color: 'orange', type: 'secondary'},
    {color: 'green', type: 'secondary'},
    {color: 'violet', type: 'secondary'},
    {color: 'vermillion', type: 'tertiary'},
    {color: 'teal', type: 'tertiary'}
  ]);
};
