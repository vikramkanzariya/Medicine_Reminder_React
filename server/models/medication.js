'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      medication.belongsTo(models.user,{foreignKey:"user_id"})
      medication.hasMany(models.medication_log,{foreignKey:"medication_id"})
    }
  }
  medication.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    end_date: {
      type: DataTypes.DATEONLY
    },
    time: {
      type: DataTypes.TIME,
      allowNull:false
    },
    frequency: {
      type: DataTypes.STRING
    },
    day_of_week: {
      type: DataTypes.STRING
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
    modelName: 'medication',
    paranoid:true
  });
  return medication;
};