'use strict';

const bcrypt = require('bcryptjs');

const USERS = 500;
const SCHEDULES_PER_USER = 500;
const ACTIVITIES_PER_SCHEDULE = 500;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await queryInterface.bulkInsert('users', Array(USERS).fill(0).map((_, idx) => {
        return {
          username: `username${Date.now()}`,
          password: bcrypt.hashSync('password1', 10),
          email: `username${Date.now()}@gmail.com`
        }
      })
      )
    } catch (error) {
      console.log('ERROR CREATING USER');
    }

    try {
      const users = await queryInterface.select(null, 'users', { attributes: ['id'] });
      console.log('users', users);

      console.log('CREATED USERS:', users);
      await queryInterface.bulkInsert(
        'schedules',
        Array(SCHEDULES_PER_USER).fill(0).map((_, idx) => {
          return {
            name: `schedule_${idx}_${Date.now()}`,
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-TPEnw3gWtSnrS28eChBKYVR94RkhSRBsjA&s',
            user_id: users[0].id
          }
        })
      )
    } catch (error) {
      console.log('SCHUEDLS CREATE ERROR', error)
    }

    try {
      const schedules = await queryInterface.select(null, 'schedules', { attributes: ['id'] });
      console.log('CREATED schedules:', schedules);
      for (let schedule of schedules) {
        await queryInterface.bulkInsert(
          'activities',
          Array(ACTIVITIES_PER_SCHEDULE).fill(0).map((_, idx) => {
            return {
              name: `activity_${idx}_${Date.now()}`,
              description: `description_${Date.now()}`,
              start_date: new Date(Date.now()),
              end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              schedule_id: schedule.id
            }
          })
        )
      }
    } catch (error) {
      console.log('ACTIVITIES CREATE ERROR', error)

    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
