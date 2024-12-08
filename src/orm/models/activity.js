'use strict';
const sequelize = require('sequelize');
const {
  Model
} = require('sequelize');

/**
 * 
 * @param {sequelize} sequelize 
 * @param {sequelize.DataTypes} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Activity.init({
    schedule_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    timestamps: true,
    paranoid: true
  });
  return Activity;
};