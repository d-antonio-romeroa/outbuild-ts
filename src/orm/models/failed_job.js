'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class failed_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  failed_job.init({
    job_id: DataTypes.INTEGER,
    errorMessage: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'failed_job',
  });
  return failed_job;
};