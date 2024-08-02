'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medication_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      medication_log.belongsTo(models.medication,{foreignKey:"medication_id"})
    }
  }
  medication_log.init({
    medication_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'medications',
        key:'id'
      }
    },
    taken_at: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue:"pending"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'medication_log',
  });
  return medication_log;
};