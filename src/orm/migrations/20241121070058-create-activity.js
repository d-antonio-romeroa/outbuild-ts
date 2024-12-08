'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface 
   * @param {sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      schedule_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'schedules',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    }).then(async () => {
      await queryInterface.addIndex('activities', ['name']);
      await queryInterface.addIndex('activities', ['start_date']);
      await queryInterface.addIndex('activities', ['end_date']);
      await queryInterface.addIndex('activities', ['schedule_id']);
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activities');
  }
};