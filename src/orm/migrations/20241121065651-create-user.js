'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @param {sequelize.QueryInterface} queryInterface 
   * @param {sequelize} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};